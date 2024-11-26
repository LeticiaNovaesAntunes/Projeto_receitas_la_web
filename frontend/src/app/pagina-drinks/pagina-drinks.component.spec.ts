import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDrinksComponent } from './pagina-drinks.component';

describe('PaginaDrinksComponent', () => {
  let component: PaginaDrinksComponent;
  let fixture: ComponentFixture<PaginaDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDrinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
