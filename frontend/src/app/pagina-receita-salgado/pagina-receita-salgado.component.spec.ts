import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReceitaSalgadoComponent } from './pagina-receita-salgado.component';

describe('PaginaReceitaSalgadoComponent', () => {
  let component: PaginaReceitaSalgadoComponent;
  let fixture: ComponentFixture<PaginaReceitaSalgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaReceitaSalgadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaReceitaSalgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
