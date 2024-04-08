import { Component, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { NgbTableComponent } from '../../shared/ngb-table/ngb-table.component';
import { departmentFormConfig } from '../../../constants/department-form.constant';
import { IForm } from '../../../interface/form.interface';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { AddService } from '../../../services/add.service'; // Update the path
import { FormService } from '../../../services/form.service';
import { SdwdsDrawerComponent, SdwdsDrawerService } from '@sdworx/sdwds/drawer';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [NgbTableComponent, CommonModule, FormsModule],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [
    NgbActiveModal, NgbOffcanvasConfig, NgbOffcanvas
  ]
})

export class JobComponent {
  private _sdwdsToastService = inject(SdwdsToastService);
  @Input() loaded: boolean = false;
  isDrawerOpen: boolean = false;

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  cvFile: File | null = null;

  candidate: Candidate = new Candidate();
  pdfFile!: File;

  constructor(private activeModal: NgbActiveModal, private addService: AddService, private formService: FormService,
    private apiService: ApiService, private sdwdsToastService: SdwdsToastService,
    private sdwdsDrawerService: SdwdsDrawerService, config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas, private http: HttpClient, private toastr: ToastrService) {// customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }

  departmentList: any[] = [];

  jobList: any[] = [];

  title: string = 'Confirmation';
  body: string = 'Are you sure you want to proceed?';
  yesLbl: string = 'Yes';
  noLbl: string = 'No';
  isCandidateRegistered: boolean = false;
  // api = inject(ApiService);
  // _sdwsToastService = inject(SdwdsToastService);

  //columnArray: any[] = [];
  api = new ApiService(); // Correct the instantiation
  _sdwsToastService = new SdwdsToastService(); // Correct the instantiation


  departmentForm = departmentFormConfig as IForm;

  columnArray: any[] = [
    { fieldName: 'job_title', displayName: 'Job Title', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'job_short_description', displayName: 'Short Description', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'department_name', displayName: 'Department Name', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'actions', displayName: 'Actions', dataType: 'action', buttonLabel: 'View' }

  ];

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  ngOnInit(): void {
    //this.columnArray = this.formService.buildColumnArray(departmentFormConfig);

    this.getAllActiveJobs();
  }



  getAllActiveJobs(): void {
    this.apiService.getAllActiveJob().subscribe({
      next: (response: any) => {
        this.jobList = response;

        console.log('jobList', this.jobList)
      },
      error: (error: any) => {
        this.sdwdsToastService.showError(error.message);
      }
    });
  }

  getDepartments() {
    this.api.request('departmentList', 'GET').subscribe({
      next: (response: any) => {
        this.departmentList = response;
        console.log('');
      },
      error: (error: any) => this._sdwsToastService.showError(error.message)

    });
  }

  addDepartment(data: any) {
    this.api.request('departmentList', 'POST', data).subscribe({
      next: (response: any) => {
        if (response.message == 'Added Successfully') {
          this._sdwsToastService.showSuccess('Department added successfully.');
          this.addService.closeModal();
        }
        else {
          this._sdwsToastService.showError(response.message);
        }
      },
      complete: () => this.getDepartments(),
      error: (error: any) => this._sdwsToastService.showError(error.message)
    });

  }

  editDepartment(data: any) {
    this.api.request('departmentList', 'PUT', data).subscribe({
      next: (response: any) => {
        console.log("edit resp: ", response)
        if (response.message == 'Updated Successfully') {
          this._sdwsToastService.showSuccess('Department updated successfully.');
          this.addService.closeModal();
        }
        else {
          this._sdwsToastService.showError(response.message);
        }
      },
      complete: () => this.getDepartments(),
      error: (error: any) => this._sdwsToastService.showError(error.message)
    });
  }

  deleteDepartment(data: any) {
    console.log("dept id: ", data.payrolldepartmentS_ID);
    this.api.request('deleteDepartment', 'DELETE', undefined, data.payrolldepartmentS_ID).subscribe({
      next: (response: any) => {
        console.log("response: ", response);
        if (response.message == 'Deleted Successfully') {
          this._sdwsToastService.showSuccess('Department deleted successfully.');
        }
        else {
          this._sdwsToastService.showError(response.message);
        }
      },
      error: (error: any) => this._sdwsToastService.showError(error.message),
      complete: () => this.getDepartments()
    });
  }

  registerCandidate(candidateData: Candidate, pdfFile: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('candidate.Candidate_FirstName', candidateData.Candidate_FirstName);
    formData.append('candidate.Candidate_LastName', candidateData.Candidate_LastName);
    formData.append('candidate.Candidate_Email', candidateData.Candidate_Email);
    formData.append('candidate.Candidate_Phone', candidateData.Candidate_Phone || ''); // Handle null or undefined
    formData.append('candidate.Candidate_Mobile', '58205185');
    formData.append('candidate.Candidate_Address', candidateData.Candidate_Address);

    if (this.cvFile) {
      formData.append('PdfFile', this.cvFile, this.cvFile.name);
    } else {
      console.log('No CV file selected');
    }
    return this.http.post<any>('https://recruitmentassistantai20240324125846.azurewebsites.net/api/Candidate/RegisterCandidate', formData);
  }


  submitForm() {
    // Create a new Candidate object and populate its properties
    const candidateData: Candidate = {
      Candidate_FirstName: this.firstName,
      Candidate_LastName: this.lastName,
      Candidate_Email: this.email,
      Candidate_Phone: this.phone || '', // Handle null or undefined
      Candidate_Mobile: '58205185',
      Candidate_Address: this.address,
      Candidate_ResumePath: ''
    };

    // Call registerCandidate method with candidateData and pdfFile
    this.registerCandidate(candidateData, this.pdfFile).subscribe(
      response => {
        console.log('Candidate registered successfully:', response);
        this.isCandidateRegistered = true;
        // Show success toast
        this._sdwdsToastService.showSuccess('Candidate registered successfully!', 'Success');
      },
      error => {
        console.error('An error occurred while registering candidate:', error);
        // Show error toast
        this.toastr.error('An error occurred while submitting the form.', 'Error');
      }
    );
  }

  // Function to handle file input change
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      // Get the first file from the list
      const file = target.files[0];
      console.log('File selected:', file.name);

      // Assign the selected file to cvFile property
      this.cvFile = file;
    }
  }

  // Function to handle drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropbox = event.target as HTMLElement;
    dropbox.classList.add('dragover');
  }

  // Function to handle drag leave event
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropbox = event.target as HTMLElement;
    dropbox.classList.remove('dragover');
  }

  // Function to handle drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropbox = event.target as HTMLElement;
    dropbox.classList.remove('dragover');

    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      // Get the first file from the dropped files
      const file = event.dataTransfer.files[0];
      console.log('File dropped:', file.name);

      // Assign the dropped file to cvFile property
      this.cvFile = file;
    }
  }

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: JobComponent }];



export class Candidate {
  Candidate_id?: number;
  Candidate_FirstName!: string;
  Candidate_LastName!: string;
  Candidate_Email!: string;
  Candidate_Phone?: string;
  Candidate_Mobile!: string;
  Candidate_Address!: string;
  Candidate_ResumePath?: string;
}
