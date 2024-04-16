import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchrejectedComponent } from './matchrejected.component';

describe('MatchrejectedComponent', () => {
  let component: MatchrejectedComponent;
  let fixture: ComponentFixture<MatchrejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchrejectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchrejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
