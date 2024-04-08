import { Component, Input, Output, EventEmitter, SimpleChanges, inject, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule, NgbModal, NgbModalOptions, NgbPagination, NgbTooltip, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { SdwdsModalService } from '@sdworx/sdwds/modal';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { IForm, IOptions } from '../../../interface/form.interface';
import { NgbModalDeleteComponent } from '../ngb-modal/ngb-modal-delete/ngb-modal-delete.component';
import { CommonModule } from '@angular/common';
import { AddService } from '../../../services/add.service';

@Component({
  selector: 'app-ngb-table',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, NgbDropdownModule, NgbTooltip],
  templateUrl: './ngb-table.component.html',
  styleUrl: './ngb-table.component.scss',
  providers: [NgbTableComponent]
})
export class NgbTableComponent {

  constructor(private addService: AddService) {}

  searchText: string = "";
  filteredData: any[] = [];
  selectedRow: any | null = null;
  isRowSelected: boolean = false;
  isRowNotSelected: boolean = true;

  sortedColumn: string = '';
  isAscending: boolean = true;
  selectedPayroll: string = '344D23C4-091F-44E1-B68C-F6C0F4FF3B40';

  pageSize:number = 10;
  page: number = 1;
  collectionSize:number = 0;
  pageSizes:number[] = [5, 10, 15, 20];


  @Input() tableData: any[] = [];
  @Input() columnArray: any[] = [];
  @Input() form?: IForm;
  @Input() option?: IOptions;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  sdwsModalService = inject(SdwdsModalService);
  elementRef = inject(ElementRef);

  modalRef: NgbModalRef | null = null; // Reference to the opened modal

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      console.log('tabledata: ', changes['tableData']);
      this.filteredData =  this.tableData; //this.tableData.filter(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
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
  console.log(rowData);
}

ngOnInit(): void{
   this.filteredData = this.tableData;


   console.log('filteredData', this.filteredData)

   this.addService.onAdd.subscribe((data: any) => {
    this.onAdd.emit(data);
    console.log('Received data from onAdd event:', data);
  });

  this.addService.onEdit.subscribe((data: any) => {
    this.onEdit.emit(data);
    console.log('Received data from onEdit event:', data);
  });

  this.addService.resetButton$.subscribe(() => {
    this.clearSelectedRow();
  });

  }

  editRecord(data: any){
    this.selectedRow = data;
    console.log("data being edited: ", data);
    this.onEdit.emit(data);
  }

  openDeleteConfirmationModal(data: any) {
    const config: Partial<NgbModalDeleteComponent> = {
    };
    const options: NgbModalOptions = { size: 'sm', centered: false };
    this.sdwsModalService.show((NgbModalDeleteComponent), config, options).subscribe((result) => {
      if (result.Success == true) {
        console.log("modal res: ", result);
        if (data) {
          this.deleteRecord(data);
        } else {
          this.clearSelectedRow();
        }
      }
    });
  }

  deleteRecord(data: any) {
    console.log('data being deleted: ', data);

    const dataIndex = this.tableData.findIndex((record) => record === data);

    if (dataIndex !== -1) {
      this.tableData.splice(dataIndex, 1);
      this.searchRecords();
    }

    this.onDelete.emit(data);
    this.clearSelectedRow();
  }

  searchRecords(){
    console.log('Search text is', this.searchText);
    const text = this.searchText.toLowerCase();
    if (this.searchText){
      console.log("search filtered data: ", this.filteredData);
      console.log("search table data: ", this.tableData);

      this.filteredData = this.tableData.filter(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());

        this.filteredData = this.filteredData.filter(record => {
            return this.columnArray.some(column => {
                const value = record[column.fieldName].toLowerCase();
                return value.includes(text);
            });
        });

        this.collectionSize = this.filteredData.length;
        console.log("filtered data res: ", this.filteredData)
    } else {
      console.log("search filtered data: ", this.filteredData);
      console.log("search table data: ", this.tableData);
        this.filteredData = this.tableData.filter(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
        this.collectionSize = this.filteredData.length;

    }
}

private clearSelectedRow() {
  this.selectedRow = null;
  this.isRowSelected = false;
  this.isRowNotSelected = true;
}

@HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    // Check if the click is outside the table component and not on modal buttons
    const clickedElement = event.target as HTMLElement;
    const isModalButton = this.isModalButton(clickedElement);
    const isInsideModal = this.isInsideModal(clickedElement);

    if (!isModalButton && !isInsideModal && !this.isDescendant(clickedElement, this.elementRef.nativeElement)) {
      this.clearSelectedRow();
    }
  }

  private isInsideModal(element: HTMLElement): boolean {
    // Check if the clicked element is inside the modal
    return !!element.closest('.modal');
  }

  private isModalButton(element: HTMLElement): boolean {
    // Check if the clicked element or its ancestor is a modal button
    return (element as any).matches('.btn') && (element as any).closest('.modal');
  }
  private isDescendant(el: HTMLElement, parentEl: HTMLElement): boolean {
    while (el && el.parentNode) {
      if (el.parentNode === parentEl) {
        return true;
      }
      el = el.parentNode as HTMLElement;
    }
    return false;
  }


openModal(rowData: any = null) {
  console.log('Selected Row Data:', rowData);
  const config: Partial<DynamicFormComponent> = {
    payrollnumber: this.selectedPayroll,
    form: this.form,
    // Pass the selected row data to the modal component
    data: rowData
  };

  const options: NgbModalOptions = { size: this.form?.modalSize, centered: true, backdrop: 'static' };

  this.sdwsModalService.show((DynamicFormComponent), config, options);
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

  getPageUpperLimit(){
    return Math.min((this.page * this.pageSize), this.collectionSize);
  }

  setPageSize(newPageSize:number){
    this.pageSize = newPageSize;
    this.page = 1;
  }

  changePayroll(){
    this.filteredData = this.tableData.filter(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
    console.log("filtered data af: ", this.filteredData);
    this.page = 1;
    this.collectionSize = this.filteredData.length;
  }
}
