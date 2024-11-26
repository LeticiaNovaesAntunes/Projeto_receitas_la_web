import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup; // FormGroup do formulário
  loading = false;          // Para controlar o estado de carregamento
  errorMessage = '';        // Para exibir erros

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Campo obrigatório e mínimo de 3 caracteres
      email: ['', [Validators.required, Validators.email]],           // Email obrigatório e válido
      senha: ['', [Validators.required, Validators.minLength(6)]]  // Senha obrigatória e mínimo de 6 caracteres
    });
  }

  onSubmit(): void {
    

    console.log('Formulário válido:', this.cadastroForm.value);
    this.loading = true;

    const { username, email, senha } = this.cadastroForm.value;

    // Envia os dados para o serviço
    this.usuariosService.cadastrarUsuario(username, email, senha)
      .subscribe(
        (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.router.navigate(['/login']); // Redireciona para o login após sucesso
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
          this.errorMessage = 'Erro ao criar a conta. Tente novamente.';
        }
      )
      .add(() => this.loading = false); // Finaliza o estado de carregamento
  }
}
