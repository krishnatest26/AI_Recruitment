import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSchemesComponent } from './pension-schemes.component';

describe('PensionSchemesComponent', () => {
  let component: PensionSchemesComponent;
  let fixture: ComponentFixture<PensionSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensionSchemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PensionSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
