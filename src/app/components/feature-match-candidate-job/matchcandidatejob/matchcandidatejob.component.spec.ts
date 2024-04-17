import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcandidatejobComponent } from './matchcandidatejob.component';

describe('MatchcandidatejobComponent', () => {
  let component: MatchcandidatejobComponent;
  let fixture: ComponentFixture<MatchcandidatejobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchcandidatejobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchcandidatejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
