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
  selector: 'app-applicationform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe, FormsModule],
  templateUrl: './applicationform.component.html',
  styleUrl: './applicationform.component.scss'
})
export class ApplicationformComponent implements OnInit {
  private _sdwdsToastService = inject(SdwdsToastService);
  @Input() form?: IForm;
  @Input() data?: any;
  @Input() img = 'assets/images/Logo_Icon SdWorx Positive.svg';
  @Output() closeModal = new EventEmitter<any>();

  loading: boolean = false;
  payrollnumber?: string;
  dynamicFormGroup!: FormGroup;

  acceptReason: string = '';

  firstName: string = '';
  lastName: string = '';
  jobTitle: string = '';

  candidateId!: number;
  jobApplicationId!: number;
  theAacceptanceReason: string = '';
  rejectionReason: string = '';

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private addService: AddService,
    private dataService: DataService, private apiService: ApiService, private formService: FormService, private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in input properties
    this.addService.data$.subscribe(data => {
      this.data = data;
    });
    this.firstName = this.data.candidate.candidate_FirstName
    this.lastName = this.data.candidate.candidate_LastName
    this.jobTitle = this.data.role_Name
    this.candidateId = this.data.candidate.candidate_id
    this.jobApplicationId = this.data.job_application_id
    console.log('this.candidateId', this.candidateId)
    console.log('this.jobApplicationId', this.data.job.job_id)
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

  onSubmit(event: Event) {

  }

  cancelForm(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss('cancel');
    this.addService.resetButton();
  }

  acceptApplication(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss('cancel');
    this.addService.resetButton();
    console.log('this.acceptReason', this.acceptReason)

    const candidateId = this.candidateId;
    const jobId = this.jobApplicationId;
    const acceptanceReason = this.theAacceptanceReason;
    this.apiService.acceptApplication(candidateId, jobId, acceptanceReason).subscribe(
      response => {
        this.loading = false;
        this._sdwdsToastService.showSuccess('Application Accepted!', 'Success');
      },
      error => {
        this.loading = false;
        this._sdwdsToastService.showError('Error Occured!', 'Error');
        console.error('An error occurred while accepting application:', error);
      }
    );
  }

  rejectApplication(event: Event) {
    event.preventDefault();
    this.activeModal.dismiss('cancel');
    this.addService.resetButton();
    console.log('this.acceptReason', this.acceptReason)

    const candidateId = this.candidateId;
    const jobId = this.jobApplicationId;
    const rejectionReason = this.theAacceptanceReason;
    this.apiService.rejectApplication(candidateId, jobId, rejectionReason).subscribe(
      response => {
        this.loading = false;
        this._sdwdsToastService.showSuccess('Application Rejected!', 'Success');
      },
      error => {
        this.loading = false;
        this._sdwdsToastService.showError('Error Occured!', 'Error');
        console.error('An error occurred while rejecting application:', error);
      }
    );
  }


  applyJob() {

    const candidateId = this.dataService.getCandidateId();
    const jobId = this.dataService.getJobId();

    if(candidateId == 0 || candidateId  == undefined){
      this._sdwdsToastService.showError('Upload your resume before applying a job!', 'Warning');
    } else{
      this.loading = true; // Show loading spinner
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


  }


}



