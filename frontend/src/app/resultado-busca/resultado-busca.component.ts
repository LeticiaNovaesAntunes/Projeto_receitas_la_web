import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../receita.service';

@Component({
  selector: 'app-resultado-busca',
  templateUrl: './resultado-busca.component.html',
  styleUrls: ['./resultado-busca.component.css']
})
export class ResultadoBuscaComponent implements OnInit {
  receitas: any[] = []; // Receitas filtradas
  buscaTermo: string = ''; // Termo de busca

  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService
  ) {}

  ngOnInit(): void {
    // Obtém o termo de busca da URL
    this.route.queryParams.subscribe((params) => {
      this.buscaTermo = params['busca'] || '';
      this.buscarReceitas(this.buscaTermo); // Filtra receitas com base no termo
    });
  }

  buscarReceitas(busca: string): void {
    this.receitaService.getReceitas().subscribe(
      (receitas) => {
        // Filtra receitas pelo nome ou ingredientes
        this.receitas = receitas.filter((receita) => {
          const nomeMatch = receita.nome
            .toLowerCase()
            .includes(busca.toLowerCase());

          const ingredientesArray = Array.isArray(receita.ingredientes)
            ? receita.ingredientes
            : [];

          const ingredientesMatch = ingredientesArray.some((ingrediente: string) =>
            ingrediente.toLowerCase().includes(busca.toLowerCase())
          );

          return nomeMatch || ingredientesMatch;
        });
      },
      (error) => {
        console.error('Erro ao carregar receitas:', error);
      }
    );
  }
}
