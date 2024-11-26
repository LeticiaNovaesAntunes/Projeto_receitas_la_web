import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreceitaComponent } from './formreceita.component';

describe('FormreceitaComponent', () => {
  let component: FormreceitaComponent;
  let fixture: ComponentFixture<FormreceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormreceitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormreceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
