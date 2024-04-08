import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCalendarsComponent } from './control-calendars.component';

describe('ControlCalendarsComponent', () => {
  let component: ControlCalendarsComponent;
  let fixture: ComponentFixture<ControlCalendarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCalendarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
