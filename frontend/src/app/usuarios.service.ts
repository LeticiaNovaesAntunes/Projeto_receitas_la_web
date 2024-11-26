import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios';  // Endpoint do backend

  constructor(private http: HttpClient) { }

  // Método para cadastrar um usuário
  cadastrarUsuario(username: string, email: string, senha: string): Observable<any> {
    const usuario = { username, email, senha };
  
    // Faz a requisição POST para o backend
    return this.http.post(this.apiUrl, usuario);
  }
}
