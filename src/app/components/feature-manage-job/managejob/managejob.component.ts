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

@Component({
  selector: 'app-managejob',
  standalone: true,
  imports: [NgbTableComponent, FormsModule, CommonModule, NgbPagination, NgbDropdownModule, NgbTooltip],
  templateUrl: './managejob.component.html',
  styleUrl: './managejob.component.scss'
})
export class ManagejobComponent {
  private _sdwdsToastService = inject(SdwdsToastService);

  constructor(private addService: AddService, private formService: FormService,
    private apiService: ApiService, private sdwdsToastService: SdwdsToastService,
    private http: HttpClient, private dataService: DataService) {
  }

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
  //@Input() columnArray: any[] = [];
  // @Input() form?: IForm;
  @Input() option?: IOptions;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  sdwsModalService = inject(SdwdsModalService);
  elementRef = inject(ElementRef);

  modalRef: NgbModalRef | null = null; // Reference to the opened modal

  recruiterJobList: any[] = [];

  title: string = 'Confirmation';
  body: string = 'Are you sure you want to proceed?';
  yesLbl: string = 'Yes';
  noLbl: string = 'No';

  api = new ApiService();
  _sdwsToastService = new SdwdsToastService();

  recruiterJobForm = recruiterJobFormConfig as IForm;

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
        this.filteredData = response; // Set filteredData to the retrieved job list
        console.log('recruiterJobList', this.recruiterJobList);
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


  openModal(rowData: any = null) {
    console.log('Selected Row Data:', rowData);
    const config: Partial<DynamicFormComponent> = {
      payrollnumber: this.selectedPayroll,
      form: this.recruiterJobForm,
      // Pass the selected row data to the modal component
      data: rowData
    };

    const options: NgbModalOptions = { size: this.recruiterJobForm?.modalSize, centered: true, backdrop: 'static' };

    this.sdwsModalService.show((DynamicFormComponent), config, options);
  }


  openJobModal(rowData: any = null) {
    console.log('Selected Row Data:', rowData);
    const config: Partial<JobformComponent> = {
      payrollnumber: this.selectedPayroll,
      form: this.recruiterJobForm,
      // Pass the selected row data to the modal component
      data: rowData
    };

    const options: NgbModalOptions = { size: this.recruiterJobForm?.modalSize, centered: true, backdrop: 'static' };

    this.sdwsModalService.show((JobformComponent), config, options);
  }

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: ManagejobComponent }];

