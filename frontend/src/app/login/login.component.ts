import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Para redirecionar após login bem-sucedido
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, email, senha } = this.loginForm.value;

    // Lógica para validação local (username: admin e senha: 1234)
    if (username === 'admin' && senha === '1234') {
      // Redireciona para a página desejada
      this.router.navigate(['/paginaadmin']);  // Redirecionando para a página "dashboard"
      return;
    }

    // Se as credenciais não são "admin" e "1234", faça a requisição para o servidor
    this.http.post('http://localhost:3000/login', { username, email, senha })
      .subscribe({
        next: (response: any) => {
          // Sucesso na resposta do servidor
          alert(response.message);
          if (response.user) {
            // Redireciona após o login bem-sucedido
            this.router.navigate(['/index']);  // Página padrão após login
          }
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          alert('Credenciais inválidas ou erro no servidor.');
        }
      });
  }
}
