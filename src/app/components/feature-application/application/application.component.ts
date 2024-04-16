import { Component, SimpleChanges, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { AddService } from '../../../services/add.service';
import { FormService } from '../../../services/form.service';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { NgbTableComponent } from '../../shared/ngb-table/ngb-table.component';
import { IForm } from '../../../interface/form.interface';
import { recruiterJobFormConfig } from '../../../constants/recruiter-job-form.constant';
import { Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule, NgbModal, NgbModalOptions, NgbPagination, NgbTooltip, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SdwdsModalService } from '@sdworx/sdwds/modal';
import { IOptions } from '../../../interface/form.interface';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { JobformComponent } from '../../shared/job-form/jobform/jobform.component';
import { ApplicationformComponent } from '../../shared/application-form/applicationform/applicationform.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [NgbTableComponent, FormsModule, CommonModule, NgbPagination, NgbDropdownModule, NgbTooltip],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  private _sdwdsToastService = inject(SdwdsToastService);

  constructor(private addService: AddService, private formService: FormService,
    private apiService: ApiService, private sdwdsToastService: SdwdsToastService,
    private http: HttpClient, private dataService: DataService) {
  }
  loading: boolean = false;
  searchText: string = "";
  filteredData: any[] = [];
  selectedRow: any | null = null;
  isRowSelected: boolean = false;
  isRowNotSelected: boolean = true;

  sortedColumn: string = '';
  isAscending: boolean = true;
  selectedPayroll: string = '344D23C4-091F-44E1-B68C-F6C0F4FF3B40';

  pageSize: number = 10;
  page: number = 1;
  collectionSize: number = 0;
  pageSizes: number[] = [5, 10, 15, 20];

  @Input() tableData: any[] = [];
  @Input() option?: IOptions;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  sdwsModalService = inject(SdwdsModalService);
  elementRef = inject(ElementRef);

  JobApplicationList: any[] = [];

  columnArray: any[] = [
    { fieldName: 'candidate.candidate_FirstName', displayName: 'First Name', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'candidate.candidate_LastName', displayName: 'Last Name', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'role_Name', displayName: 'Job Title', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'department_name', displayName: 'Department', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'actions', displayName: 'Actions', dataType: 'action', buttonLabel: 'View' }
  ];


  ngOnInit(): void {
    this.getApplications();
  }

  acceptApplication(data: any) {
    console.log('Response Data:', data);
    const config: Partial<ApplicationformComponent> = {
      data: data
    };
    const options: NgbModalOptions = { size: '600px', centered: true, backdrop: 'static' };
    this.sdwsModalService.show((ApplicationformComponent), config, options);
  }

  getNestedProperty(data: any, fieldName: string): any {
    if (!data || !fieldName) return '';

    const fieldNames = fieldName.split('.');
    let value = data;

    for (const field of fieldNames) {
      value = value[field];
      if (value === undefined || value === null) break;
    }

    return value;
  }

  getApplications(): void {
    this.apiService.getJobApplications().subscribe({
      next: (response: any) => {
        this.JobApplicationList = response;
        this.filteredData = response;

        console.log('response', response['candidate[candidate_FirstName]'])

        console.log('JobApplicationList', this.JobApplicationList);
      },
      error: (error: any) => {
        this.sdwdsToastService.showError(error.message);
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      console.log('tabledata: ', changes['tableData']);
      this.filteredData = this.tableData; //this.tableData.filter(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
      this.collectionSize = this.filteredData.length;
    }
  }

  isSelectedRow(rowData: any): boolean {
    return this.selectedRow === rowData;
  }

  selectRow(rowData: any) {
    this.selectedRow = rowData;
    this.isRowSelected = true;
    this.isRowNotSelected = false;
    this.dataService.setJobId(rowData.job_id);
  }

  sortBy(column: any) {
    if (this.sortedColumn == column) {
      this.isAscending = !this.isAscending;
    }
    else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.filteredData.sort((a, b) => {
      const valueA = a[this.sortedColumn];
      const valueB = b[this.sortedColumn];

      if (this.isAscending) {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  getPageUpperLimit() {
    return Math.min((this.page * this.pageSize), this.collectionSize);
  }

  setPageSize(newPageSize: number) {
    this.pageSize = newPageSize;
    this.page = 1;
  }


}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: ApplicationComponent }];
