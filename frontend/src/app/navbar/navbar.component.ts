import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  buscaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buscaForm = this.fb.group({
      busca: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const buscaTermo = this.buscaForm.get('busca')?.value;
    this.router.navigate(['/resultado-busca'], { queryParams: { busca: buscaTermo } });
  }
}