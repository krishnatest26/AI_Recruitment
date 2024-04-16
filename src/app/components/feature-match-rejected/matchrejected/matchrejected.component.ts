import { Component, SimpleChanges, TemplateRef, inject } from '@angular/core';
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
import { NgbActiveModal, NgbDropdownModule, NgbModal, NgbModalOptions, NgbPagination, NgbTooltip, NgbModalRef, NgbOffcanvas, NgbOffcanvasConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SdwdsModalService } from '@sdworx/sdwds/modal';
import { IOptions } from '../../../interface/form.interface';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { JobformComponent } from '../../shared/job-form/jobform/jobform.component';
import { ApplicationformComponent } from '../../shared/application-form/applicationform/applicationform.component';


@Component({
  selector: 'app-matchrejected',
  standalone: true,
  imports: [NgbTableComponent, NgbAccordionModule, FormsModule, CommonModule, NgbPagination, NgbDropdownModule, NgbTooltip],
  templateUrl: './matchrejected.component.html',
  styleUrl: './matchrejected.component.scss'
})
export class MatchrejectedComponent {
  private _sdwdsToastService = inject(SdwdsToastService);

  constructor(private addService: AddService, private formService: FormService,
    private apiService: ApiService, private sdwdsToastService: SdwdsToastService,
    private http: HttpClient, private dataService: DataService,
    private offcanvasService: NgbOffcanvas, config: NgbOffcanvasConfig) {
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
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

  rejectedMatchList: any[] = [];
  transformedData: any[] = []; // Store the transformed data here
  selectedJobCandidates: any[] = [];

  sdwsModalService = inject(SdwdsModalService);
  elementRef = inject(ElementRef);

  columnArray: any[] = [
    { fieldName: 'job.job_title', displayName: 'Job Title', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'job.job_short_description', displayName: 'Description', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'job.department_name', displayName: 'Department', dataType: 'nvarchar', length: 20, required: false },
    { fieldName: 'actions', displayName: 'Actions', dataType: 'action', buttonLabel: 'View' }
  ];



  ngOnInit(): void {
    this.getRejectedMatching();
  }

  getRejectedMatching(): void {
    this.loading = true;
    this.apiService.getRejectedMatch().subscribe({
      next: (response: any) => {
        // Store the original data in rejectedMatchList
        this.rejectedMatchList = response;
        this.filteredData = response;
        console.log('rejectedMatchList', this.rejectedMatchList);
        // Transform the data
        this.transformedData = Object.values(this.groupByJobId(this.rejectedMatchList));

        this.loading = false;
        console.log('transformedData', this.transformedData);
      },
      error: (error: any) => {
        this.loading = false;
        this.sdwdsToastService.showError(error.message);
      }
    });
  }

  groupByJobId(rejectedMatchList: any[]): any {
    const transformedData: any = {};
    rejectedMatchList.forEach((item: any) => {
      const jobId = item.job.job_id;
      if (!transformedData[jobId]) {
        transformedData[jobId] = {
          job: item.job,
          rejectedCandidates: []
        };
      }
      transformedData[jobId].rejectedCandidates.push(item);
    });
    return transformedData;
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


    this.selectedJobCandidates = rowData;
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


  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }


}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: MatchrejectedComponent }];

