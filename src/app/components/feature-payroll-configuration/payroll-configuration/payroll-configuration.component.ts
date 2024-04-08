import { Component, Output, EventEmitter, inject, ChangeDetectorRef} from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { IForm } from '../../../interface/form.interface';
import { NgbActiveModal, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { payrollSettingBaseDataFormConfig } from '../../../constants/payroll-configuration-base-data-form.constant';
import { payrollSettingFormConfig } from '../../../constants/payroll-configuration-form.constant';
import { costCodeformatFormConfig } from '../../../constants/payroll-configuration-cost-code-format-form.constant'
import { ApiService } from '../../../services/api.service';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { AddService } from '../../../services/add.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payroll-configuration',
  standalone: true,
  imports: [DynamicFormComponent, FormsModule, NgbModule, NgbNavModule, NgbDropdownModule],
  templateUrl: './payroll-configuration.component.html',
  styleUrl: './payroll-configuration.component.scss',
  providers: [NgbActiveModal]
})
export class PayrollConfigurationComponent {
  constructor(private addService: AddService, private cdr: ChangeDetectorRef) {}

  @Output() onEdit = new EventEmitter<any>();

  payrollConfigForm = payrollSettingFormConfig as IForm;
  payrollConfigBaseDataForm = payrollSettingBaseDataFormConfig as IForm;
  costCodeformatForm = costCodeformatFormConfig as IForm;

  baseDataList: any[] = [];

  api = inject(ApiService);
_sdwsToastService = inject(SdwdsToastService);

  selectedPayroll: string = '6f9619ff-8b86-d011-b42d-00c04fc964ff';
  data: any[] = [];

  // Filtered record to be displayed
  filteredRecord: any;

  ngOnInit(): void{
    this.getBaseDetails();
    console.log(this.api.endpoints);
    this.addService.editBaseDetails$.subscribe((data: any) => {
     this.editBaseDetails(data);
      console.log('Received data from onEdit event:', data);
    });

    // this.addService.onEdit.subscribe((data: any) => {
    //   this.onEdit.emit(data);
    //   console.log('Received data from onEdit event:', data);
    // });
  }

  getBaseDetails(): void {
    this.api.request('baseDetailsList', 'GET').subscribe({
      next: (response: any) => {
        this.baseDataList = response;
        console.log(response);
         this.filteredRecord = this.baseDataList.find(record => record.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
        console.log("getFilteredrecord",this.filteredRecord);
        this.addService.setData(this.filteredRecord);
      },
      error: (error: any) => {
        this._sdwsToastService.showError(error.message);
      },
    });
  }

  editBaseDetails(data: any){
    console.log("edit dataaa: ", data);
    this.api.request('baseDetailsList', 'PUT', data).subscribe({
      next: (response: any) => {
      console.log("edit resp: ", response)
      if (response.message == 'Updated Successfully.'){
        this._sdwsToastService.showSuccess('Updated Successfully.');
      }
      else {
        this._sdwsToastService.showError(response.message);
        console.log(response.message);
      }
    },
    complete: () => this.getBaseDetails(),
    error: (error: any) => this._sdwsToastService.showError(error.message)
    });
  }

changePayroll(): void {
  console.log(this.selectedPayroll);
  this.filteredRecord = this.baseDataList.find(item => item.payrollcompanydetailS_ID.toUpperCase() === this.selectedPayroll.toUpperCase());
  console.log(this.filteredRecord);
  this.addService.setData(this.filteredRecord);
}

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PayrollConfigurationComponent }];
