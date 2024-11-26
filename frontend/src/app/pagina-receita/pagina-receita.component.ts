import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../receita.service';

@Component({
  selector: 'app-pagina-receita',
  templateUrl: './pagina-receita.component.html',
  styleUrls: ['./pagina-receita.component.css']
})
export class PaginaReceitaComponent implements OnInit {
  receita: any;
  nome: string = '';
  ingredientes: string[] = [];
  etapas: string[] = [];
  capa: string = ''; // Para armazenar a imagem convertida

  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.nome = params['nome'];
      this.ingredientes = params['ingredientes'] ? params['ingredientes'].split(',') : [];
      this.etapas = params['etapas'] ? params['etapas'].split(',') : [];
      this.buscarReceita(id);
    });
  }

  buscarReceita(id: string): void {
    this.receitaService.getReceitas().subscribe((receitas) => {
      const receitaEncontrada = receitas.find((receita) => receita.id_receita === id);

      if (receitaEncontrada) {
        this.receita = receitaEncontrada;
        // Converter a capa para Base64 se estiver disponível
        if (this.receita.capa && this.receita.capa.type === 'Buffer' && Array.isArray(this.receita.capa.data)) {
          const byteCharacters = new Uint8Array(this.receita.capa.data);
          const blob = new Blob([byteCharacters]);
          this.blobToBase64(blob).then((base64) => {
            this.capa = base64;
          });
        }
      }
    });
  }

  // Método auxiliar para converter Blob em Base64
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
