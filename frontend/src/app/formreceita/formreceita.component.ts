import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formreceita',
  templateUrl: './formreceita.component.html',
  styleUrls: ['./formreceita.component.css']
})
export class FormReceitaComponent {
  formReceita: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formReceita = this.fb.group({
      nomeReceita: ['', Validators.required],
      ingredienteReceita: ['', Validators.required],
      etapasReceita: ['', Validators.required],
      tempoPreparo: ['', [Validators.required, Validators.min(1)]],
      tipoReceita: ['', Validators.required],
      tematica: [false],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.formReceita.invalid || !this.selectedFile) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const formData = new FormData();
    formData.append('capaReceita', this.selectedFile);
    Object.keys(this.formReceita.value).forEach((key) => {
      formData.append(key, this.formReceita.value[key]);
    });

    this.http.post('http://localhost:3000/receitas', formData).subscribe({
      next: (response: any) => {
        alert('Receita cadastrada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao enviar receita:', err);
        alert('Erro ao cadastrar receita.');
      }
    });
  }
}
