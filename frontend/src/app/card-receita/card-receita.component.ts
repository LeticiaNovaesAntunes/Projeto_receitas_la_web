import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../receita.service'; // Importe o serviço
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-card-receita',
  templateUrl: './card-receita.component.html',
  styleUrls: ['./card-receita.component.css']
})
export class CardReceitaComponent implements OnInit {

  receitas: any[] = []; // Armazenará as receitas

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.carregarReceitas(); // Chama o método ao inicializar o componente
  }

  carregarReceitas(): void {
    this.receitaService.getReceitas().subscribe(
      (data) => {
        // Mapeia as receitas e converte a capa de BLOB para Base64
        this.receitas = data.map(receita => {
          // Se a capa for um Buffer, converta para Blob
          if (receita.capa && receita.capa.type === 'Buffer' && Array.isArray(receita.capa.data)) {
            const byteCharacters = new Uint8Array(receita.capa.data);
            const blob = new Blob([byteCharacters]);
            receita.capa = this.blobToBase64(blob);
          }
          return receita;
        });
      },
      (error) => {
        console.error('Erro ao carregar receitas', error);
      }
    );
  }

  // Método auxiliar para converter Blob em Base64
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Retorna o resultado em Base64
      };
      reader.onerror = reject; // Em caso de erro, rejeita a Promise
      reader.readAsDataURL(blob); // Lê o BLOB como Data URL
    });
  }
}