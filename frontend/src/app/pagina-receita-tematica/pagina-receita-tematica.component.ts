import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../receita.service'; // Importe o serviço

@Component({
  selector: 'app-pagina-receita-tematica',
  templateUrl: './pagina-receita-tematica.component.html',
  styleUrls: ['./pagina-receita-tematica.component.css'],
})
export class PaginaReceitaTematicaComponent implements OnInit {
  receitas: any[] = []; // Todas as receitas retornadas do serviço
  receitasFiltradas: any[] = []; // Apenas receitas com temática "sim"

  constructor(private receitaService: ReceitaService) {}

  ngOnInit(): void {
    this.carregarReceitas(); // Chama o método ao inicializar o componente
  }

  carregarReceitas(): void {
    this.receitaService.getReceitas().subscribe(
      (data) => {
        this.receitas = data; // Recebe todas as receitas do backend
        console.log('Receitas carregadas:', this.receitas); // Depuração
        this.filtrarReceitasPorTema(); // Filtra receitas cuja temática seja "sim"
      },
      (error) => {
        console.error('Erro ao carregar receitas', error);
      }
    );
  }

  filtrarReceitasPorTema(): void {
    // Filtra receitas com temática "Sim", garantindo que a comparação não falhe por letras maiúsculas/minúsculas
    this.receitasFiltradas = this.receitas.filter((receita) => {
      const isTematicaSim =
        receita.tematica &&
        receita.tematica.toString().toLowerCase() === 'sim'; // Trata nulos/undefined e converte para string
      console.log(
        `Receita: ${receita.nome}, Temática: ${receita.tematica}, Incluída: ${isTematicaSim}`
      );
      return isTematicaSim;
    });

    console.log('Receitas filtradas:', this.receitasFiltradas);
  }
}
