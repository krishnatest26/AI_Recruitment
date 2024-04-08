import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSpecialCalculationAccumulatorComponent } from './pension-special-calculation-accumulator.component';

describe('PensionSpecialCalculationAccumulatorComponent', () => {
  let component: PensionSpecialCalculationAccumulatorComponent;
  let fixture: ComponentFixture<PensionSpecialCalculationAccumulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensionSpecialCalculationAccumulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PensionSpecialCalculationAccumulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
