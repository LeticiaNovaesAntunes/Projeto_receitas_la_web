import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReceitaTematicaComponent } from './pagina-receita-tematica.component';

describe('PaginaReceitaTematicaComponent', () => {
  let component: PaginaReceitaTematicaComponent;
  let fixture: ComponentFixture<PaginaReceitaTematicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaReceitaTematicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaReceitaTematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
