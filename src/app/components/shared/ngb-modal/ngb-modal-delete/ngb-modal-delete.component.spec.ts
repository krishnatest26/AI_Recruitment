import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModalDeleteComponent } from './ngb-modal-delete.component';

describe('NgbModalDeleteComponent', () => {
  let component: NgbModalDeleteComponent;
  let fixture: ComponentFixture<NgbModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModalDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgbModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
