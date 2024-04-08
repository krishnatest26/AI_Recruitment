import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousTablesComponent } from './miscellaneous-tables.component';

describe('MiscellaneousTablesComponent', () => {
  let component: MiscellaneousTablesComponent;
  let fixture: ComponentFixture<MiscellaneousTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousTablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellaneousTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
