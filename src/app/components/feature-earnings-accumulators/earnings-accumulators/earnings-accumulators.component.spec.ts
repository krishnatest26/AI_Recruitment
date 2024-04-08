import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsAccumulatorsComponent } from './earnings-accumulators.component';

describe('EarningsAccumulatorsComponent', () => {
  let component: EarningsAccumulatorsComponent;
  let fixture: ComponentFixture<EarningsAccumulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningsAccumulatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningsAccumulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
