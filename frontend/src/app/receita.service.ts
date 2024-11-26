import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  private apiUrl = 'http://localhost:3000/api/receitas'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para obter as receitas
  getReceitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((receitas) => this.convertBlobToImage(receitas)) // Converte BLOBs para URLs
    );
  }

  // Método para retornar receitas filtradas por tema
  getReceitasPorTema(tema: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tema=${tema}`).pipe(
      map((receitas) => this.convertBlobToImage(receitas)) // Converte BLOBs para URLs
    );
  }

  // Método para buscar receitas por termo
  buscarReceitas(busca: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?busca=${busca}`).pipe(
      map((receitas) => this.convertBlobToImage(receitas)) // Converte BLOBs para URLs
    );
  }

 // Método para converter BLOB em URL de imagem
private convertBlobToImage(receitas: any[]): any[] {
  return receitas.map((receita) => {
    if (receita.capa) {
      // Verifica se a capa é um Buffer e converte para Blob
      if (receita.capa.type === 'Buffer' && Array.isArray(receita.capa.data)) {
        // Converte o array de dados do Buffer em um Uint8Array
        const byteCharacters = new Uint8Array(receita.capa.data);
        const blob = new Blob([byteCharacters]);
        receita.capa = this.blobToImage(blob); // Converte Blob para URL
      } else if (receita.capa instanceof Blob) {
        receita.capa = this.blobToImage(receita.capa); // Converte Blob diretamente
      } else {
        console.warn('Capa não é um Blob ou Buffer válido:', receita.capa);
      }
    }
    return receita;
  });
}

// Método auxiliar para criar a URL do BLOB
private blobToImage(blob: Blob): string {
  return URL.createObjectURL(blob);
}
}
