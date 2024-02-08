import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRecetaComponent } from './nueva-receta.component';

describe('NuevaRecetaComponent', () => {
  let component: NuevaRecetaComponent;
  let fixture: ComponentFixture<NuevaRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaRecetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
