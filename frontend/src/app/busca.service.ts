import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  
  private apiUrl = 'http://localhost:3000/api/receitas'; // URL do seu backend

  constructor(private http: HttpClient) { }

  private receitasEncontradas: any[] = [];

  setReceitas(receitas: any[]): void {
    this.receitasEncontradas = receitas;
  }

  getReceitas(): any[] {
    return this.receitasEncontradas;
  }
}