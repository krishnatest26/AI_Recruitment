import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityDeductionComponent } from './charity-deduction.component';

describe('CharityDeductionComponent', () => {
  let component: CharityDeductionComponent;
  let fixture: ComponentFixture<CharityDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityDeductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharityDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
