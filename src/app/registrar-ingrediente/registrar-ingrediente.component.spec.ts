import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIngredienteComponent } from './registrar-ingrediente.component';

describe('RegistrarIngredienteComponent', () => {
  let component: RegistrarIngredienteComponent;
  let fixture: ComponentFixture<RegistrarIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarIngredienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
