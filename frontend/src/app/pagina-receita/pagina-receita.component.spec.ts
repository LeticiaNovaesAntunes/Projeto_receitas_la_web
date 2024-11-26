import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReceitaComponent } from './pagina-receita.component';

describe('PaginaReceitaComponent', () => {
  let component: PaginaReceitaComponent;
  let fixture: ComponentFixture<PaginaReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaReceitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
