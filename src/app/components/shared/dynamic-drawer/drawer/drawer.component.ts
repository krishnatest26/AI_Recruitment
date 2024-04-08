import { Component, Inject, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../../../interface/form.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe  } from '@angular/common';
import { AddService } from '../../../../services/add.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit {
  @Input() form?: IForm;
  @Input() data?: any;
  @Input() img = 'assets/images/Logo_Icon SdWorx Positive.svg';
  payrollnumber?: string;

  dynamicFormGroup!: FormGroup;

  @Output() closeModal = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private addService: AddService) {}

  ngOnInit(): void {
    // Subscribe to changes in input properties
    this.addService.data$.subscribe(data => {
      this.data = data;

    });

  }






}
