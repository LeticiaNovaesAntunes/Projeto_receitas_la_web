import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSobremesasComponent } from './pagina-sobremesas.component';

describe('PaginaSobremesasComponent', () => {
  let component: PaginaSobremesasComponent;
  let fixture: ComponentFixture<PaginaSobremesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSobremesasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSobremesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
