import { Component, Inject, Input, OnInit, EventEmitter, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../../interface/form.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AddService } from '../../../services/add.service';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
})
export class DynamicFormComponent implements OnInit {
  private _sdwdsToastService = inject(SdwdsToastService);
  @Input() form?: IForm;
  @Input() data?: any;
  @Input() img = 'assets/images/Logo_Icon SdWorx Positive.svg';

  loading: boolean = false;
  payrollnumber?: string;

  dynamicFormGroup!: FormGroup;

  @Output() closeModal = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private addService: AddService,
    private dataService: DataService, private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in input properties
    this.addService.data$.subscribe(data => {
      this.data = data;
      console.log("get data", this.data.payrollcompanydetailS_ID);

      this.payrollnumber = this.data.payrollcompanydetailS_ID;
      this.setupFormGroup();
    });
    this.setupFormGroup();
  }

  private setupFormGroup(): void {

    if (this.form?.formControls) {
      console.log('formControls', this.form?.formControls)
      console.log('data', this.data)

      const formGroup: { [key: string]: any } = {};

      this.form.formControls.forEach((control: IFormControl) => {
        const controlValidators: any = [];

        let controlValue: any = this.data ? this.data[control.name] || '' : '';

        // Check if the control is of type 'date'
        if (control.type === 'date') {
          // Format the date value
          controlValue = this.formatDate(controlValue);
        }

        // Assign the value from this.data to control.value
        control.value = controlValue;

        formGroup[control.name] = [controlValue, controlValidators];
      });

      this.dynamicFormGroup = this.fb.group(formGroup);
    }
    this.addService.closeModal$.subscribe(() => {
      this.activeModal.close();
    });
  }

  formatDate(dateValue: any): string | null {
    // console.log('Date value:', dateValue);
    let formattedDate: string | null = null;

    if (typeof dateValue === 'string' || typeof dateValue === 'number' || dateValue instanceof Date) {
      const datePipe = new DatePipe('en-US');
      formattedDate = datePipe.transform(dateValue, 'yyyy-MM-dd');
      console.log('Invalid date value:', formattedDate);
    } else {
      // Handle invalid or unexpected values
      console.error('Invalid date value:', dateValue);
    }

    return formattedDate;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("My changes", changes);
    if (changes['form'] || changes['data']) {

      this.setupFormGroup();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.dynamicFormGroup.valid) {
      console.log("form val:", this.dynamicFormGroup.value);
      this.dynamicFormGroup.value['payrollcompanydetailS_ID'] = this.payrollnumber;

      // Convert checkbox values back to 'T' or 'F'
      for (const controlName of Object.keys(this.dynamicFormGroup.value)) {
        if (this.form?.formControls.find(control => control.name === controlName)?.type === 'checkbox') {
          this.dynamicFormGroup.value[controlName] = this.dynamicFormGroup.value[controlName] ? 'T' : 'F';
        }
      }

      if (this.data) {
        const updatedRowData = { ...this.data, ...this.dynamicFormGroup.value };
        //this.addService.emitEdit(updatedRowData);
        this.addService.emitEditBaseDetails(updatedRowData); // Emit the edited data
        console.log('updated row data edit: ', updatedRowData);
      }
      else {
        console.log('Add row: ', this.dynamicFormGroup.value);
        this.addService.emitAdd(this.dynamicFormGroup.value);
        console.log(this.activeModal);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  cancelForm(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss('cancel');
    this.addService.resetButton();
  }

  getValidationErrors(control: IFormControl, dirty: boolean): string {
    if (!dirty) {
      return '';
    }
    const formControl = this.dynamicFormGroup.get(control.name);
    let errorMessage = '';
    // control.validators.forEach((validator) => {
    //   if (formControl?.hasError(validator.validatorName as string)) {
    //     errorMessage = validator.message as string;
    //   }
    // });
    return errorMessage;
  }

  applyJob() {
    this.loading = true; // Show loading spinner
    const candidateId = this.dataService.getCandidateId();
    const jobId = this.dataService.getJobId();

    this.apiService.applyForJob(candidateId, jobId).subscribe(
      response => {
        this.loading = false;
        this._sdwdsToastService.showSuccess('Job Application Successful!', 'Success');
        console.log('Job applied successfully:', response);
      },
      error => {
        this.loading = false;
        this._sdwdsToastService.showError('Error Occured!', 'Error');
        console.error('An error occurred while applying for the job:', error);
      }
    );
  }
  isRequiredValidatorPresent(control: any): boolean {
    return control.validators && control.validators.some((validator: { validatorName: string; }) => validator.validatorName === 'required');
  }
}
