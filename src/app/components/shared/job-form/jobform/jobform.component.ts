import { Component, Inject, Input, OnInit, EventEmitter, Output, SimpleChanges, inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../../../interface/form.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AddService } from '../../../../services/add.service';
import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe, FormsModule],
  templateUrl: './jobform.component.html',
  styleUrl: './jobform.component.scss'
})
export class JobformComponent implements OnInit {
  private _sdwdsToastService = inject(SdwdsToastService);
  @Input() form?: IForm;
  @Input() data?: any;
  @Input() img = 'assets/images/Logo_Icon SdWorx Positive.svg';
  @Output() closeModal = new EventEmitter<any>();

  loading: boolean = false;
  payrollnumber?: string;
  dynamicFormGroup!: FormGroup;


  job_title: string = '';
  job_short_description: string = '';
  Location_id: string = '';
  Role_id: string = '';
  numberOfHires: string = '';
  recruitmentLeadId: string = '';
  hayLevel: string = '';
  recruitmentReason: string = '';
  status: string = '';
  technicalSkills: string = '';
  experience: string = '';
  responsibility: string = '';
  degree: string = '';
  softSkills: string = '';
  certificate: string = '';

  // Selected values
  jobTitle: string = '';
  locationId: string = '';
  roleId: string = '';

  job: Job = new Job();

  // Dropdown options
  locationOptions: { id: number, title: string }[] = [
    { id: 1, title: 'Mauriuss' },
    { id: 2, title: 'Another Location' },
  ];

  roleOptions: { id: number, title: string }[] = [
    { id: 1, title: 'Software Developer' },
    { id: 2, title: 'Another Role' },
  ];


  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private addService: AddService,
    private dataService: DataService, private apiService: ApiService, private formService: FormService, private http: HttpClient,
    private toastr: ToastrService
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

    // Call registerCandidate method with candidateData and pdfFile
    this.createjob().subscribe(
      response => {
        this.loading = false;
        console.log('Job Created successfully:', response);
        this._sdwdsToastService.showSuccess('Job Created Successfully!', 'Success');
      },
      error => {
        this.loading = false;
        console.error('An error occurred while creating Job:', error);
        // Show error toast
        this._sdwdsToastService.showError('Fill all the fields before saving!', 'Error');
      }
    );
  }

  createjob(): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('job_title', this.jobTitle);
    formData.append('job_short_description', this.job_short_description);
    formData.append('Certificate', this.certificate);
    formData.append('SoftSkills', this.softSkills);
    formData.append('Degree', this.degree);
    formData.append('Responsibility', this.responsibility);
    formData.append('Experience', this.experience);
    formData.append('TechnicalSkills', this.technicalSkills);
    formData.append('RecruiterName', 'test');
    formData.append('Role_Name', 'test');
    formData.append('Role_id', this.roleId);
    formData.append('department_name', 'test');
    formData.append('Location_Name', this.locationId);
    formData.append('Location_id', this.locationId); //
    formData.append('Status', this.status);
    formData.append('Recruitment_Reason', this.recruitmentReason);
    formData.append('Hay_Level', '1');
    formData.append('Recruitment_Lead_id', '1');
    formData.append('Number_of_Hires', this.numberOfHires);
    formData.append('country_name', 'Mauritius');
    console.log('job', formData)

    return this.http.post<any>('https://localhost:7063/api/Job/CreateJob', formData);
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

    return errorMessage;
  }

}


export class Job {
  job_id?: number;
  job_title?: string;
  job_short_description?: string;
  Location_id?: string;
  Role_id?: string;
  Number_of_Hires?: string;
  Recruitment_Lead_id?: string;
  Hay_Level?: string;
  Recruitment_Reason?: string;
  Status?: string;
  country_name?: string;
  Location_Name?: string;
  department_name?: string;
  Role_Name?: string;
  RecruiterName?: string;
  TechnicalSkills?: string;
  Experience?: string;
  Responsibility?: string;
  Degree?: string;
  SoftSkills?: string;
  Certificate?: string;
}
