import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../receita.service'; // Importe o serviço
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-pagina-sobremesas',
  templateUrl: './pagina-sobremesas.component.html',
  styleUrl: './pagina-sobremesas.component.css'
})
export class PaginaSobremesasComponent implements OnInit {
   
  
  receitas: any[] = []; // Armazenará as receitas

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.carregarReceitas(); // Chama o método ao inicializar o componente
  }

  carregarReceitas(): void {
    this.receitaService.getReceitasPorTema('Doce').subscribe(
      (data) => {
        this.receitas = data; // Armazena as receitas retornadas do backend
      },
      (error) => {
        console.error('Erro ao carregar receitas', error);
      }
    );
  }
}
