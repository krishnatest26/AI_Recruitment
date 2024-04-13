import { Component, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { AddService } from '../../../services/add.service';
import { FormService } from '../../../services/form.service';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { NgbTableComponent } from '../../shared/ngb-table/ngb-table.component';
import { departmentFormConfig } from '../../../constants/department-form.constant';
import { IForm } from '../../../interface/form.interface';

@Component({
  selector: 'app-managejob',
  standalone: true,
  imports: [NgbTableComponent],
  templateUrl: './managejob.component.html',
  styleUrl: './managejob.component.scss'
})
export class ManagejobComponent {
  private _sdwdsToastService = inject(SdwdsToastService);

  constructor(private addService: AddService, private formService: FormService,
    private apiService: ApiService, private sdwdsToastService: SdwdsToastService,
     private http: HttpClient, private dataService: DataService) {
  }

  recruiterJobList: any[] = [];

  title: string = 'Confirmation';
  body: string = 'Are you sure you want to proceed?';
  yesLbl: string = 'Yes';
  noLbl: string = 'No';

  api = new ApiService();
  _sdwsToastService = new SdwdsToastService();

  departmentForm = departmentFormConfig as IForm;

  columnArray: any[] = [
    { fieldName: 'job_title', displayName: 'Job Title', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'job_short_description', displayName: 'Short Description', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'country_name', displayName: 'Country Name', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'department_name', displayName: 'Department Name', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'status', displayName: 'Status', dataType: 'nvarchar', length: 20, required: true },
    { fieldName: 'actions', displayName: 'Actions', dataType: 'action', buttonLabel: 'View' }
  ];

  ngOnInit(): void {
    //this.columnArray = this.formService.buildColumnArray(departmentFormConfig);

    this.getAllJobs();
  }

  getAllJobs(): void {
    this.apiService.getAllJob().subscribe({
      next: (response: any) => {
        this.recruiterJobList = response;

        console.log('recruiterJobList', this.recruiterJobList)
      },
      error: (error: any) => {
        this.sdwdsToastService.showError(error.message);
      }
    });
  }
}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: ManagejobComponent }];

