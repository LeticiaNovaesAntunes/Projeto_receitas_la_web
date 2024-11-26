import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoBuscaComponent } from './resultado-busca.component';
import { ReceitaService } from '../receita.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResultadoBuscaComponent', () => {
  let component: ResultadoBuscaComponent;
  let fixture: ComponentFixture<ResultadoBuscaComponent>;
  let receitaService: ReceitaService;

  beforeEach(async () => {
    const receitaServiceMock = {
      getReceitas: jasmine.createSpy('getReceitas').and.returnValue(of([
        { nome: 'Receita 1', ingredientes: ['Ingrediente 1', 'Ingrediente 2'] },
        { nome: 'Receita 2', ingredientes: ['Ingrediente 3'] }
      ]))
    };

    await TestBed.configureTestingModule({
      declarations: [ ResultadoBuscaComponent ],
      providers: [
        { provide: ReceitaService, useValue: receitaServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ busca: 'Receita' })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter receitas based on buscaTermo', () => {
    expect(component.receitas.length).toBe(2);
    expect(component.receitas[0].nome).toBe('Receita 1');
  });
});