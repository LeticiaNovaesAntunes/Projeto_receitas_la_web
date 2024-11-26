import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirecionar após login bem-sucedido
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get('http://localhost:3000/usuarios')
      .subscribe({
        next: (response: any) => {
          this.users = response;
        },
        error: (err) => {
          console.error('Erro ao carregar usuários:', err);
        }
      });

      
  }



deleteUser(id: number): void {
  // Exibindo o alerta estilizado para confirmação de exclusão
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Você não poderá reverter essa ação!',
    icon: 'warning',
    showCancelButton: true,  // Exibe o botão de "Cancelar"
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Realiza a requisição DELETE se o usuário confirmar
      this.http.delete<{ message: string }>(`http://localhost:3000/usuarios/${id}`)
        .subscribe({
          next: (response) => {
            // Exibindo um alerta de sucesso após a exclusão
            Swal.fire({
              icon: 'success',
              title: 'Usuário deletado com sucesso!',
              text: response.message,  // A mensagem retornada pela API
              confirmButtonText: 'Fechar',
              confirmButtonColor: '#3085d6',
              background: '#f0f8ff', // Cor de fundo personalizada
              timer: 3000  // O alerta desaparecerá após 3 segundos
            });

            // Atualiza a lista de usuários
            this.loadUsers();
          },
          error: (err) => {
            console.error('Erro ao deletar usuário:', err);
            // Exibindo um alerta de erro caso falhe a exclusão
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Não foi possível deletar o usuário. Tente novamente.',
              confirmButtonText: 'Fechar',
              confirmButtonColor: '#d33',
              background: '#f8d7da', // Cor de fundo para erro
              timer: 3000  // O alerta desaparecerá após 3 segundos
            });
          }
        });
    }
  });
}

  
}
