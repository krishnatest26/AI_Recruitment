import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationControlsComponent } from './calculation-controls.component';

describe('CalculationControlsComponent', () => {
  let component: CalculationControlsComponent;
  let fixture: ComponentFixture<CalculationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
