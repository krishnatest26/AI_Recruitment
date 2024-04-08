import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionBandingComponent } from './pension-banding.component';

describe('PensionBandingComponent', () => {
  let component: PensionBandingComponent;
  let fixture: ComponentFixture<PensionBandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensionBandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PensionBandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
