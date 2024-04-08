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


@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [NgbTableComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  providers: [
    NgbActiveModal
  ]
})
export class DepartmentsComponent {

  constructor(private activeModal: NgbActiveModal, private addService: AddService, private formService: FormService) {}

departmentList: any[] = [];

      title: string= 'Confirmation';
      body: string= 'Are you sure you want to proceed?';
      yesLbl : string='Yes';
      noLbl: string='No';

// api = inject(ApiService);
// _sdwsToastService = inject(SdwdsToastService);

columnArray: any[] = [];
api = new ApiService(); // Correct the instantiation
_sdwsToastService = new SdwdsToastService(); // Correct the instantiation


departmentForm = departmentFormConfig as IForm;

  ngOnInit(): void{
    this.columnArray = this.formService.buildColumnArray(departmentFormConfig);
    this.getDepartments();
    //console.log(this.api.endpoints);
  }

  // buildColumnArray(): void {
  //   this.departmentForm.formControls.forEach(control => {
  //     let column = {
  //       fieldName: control.name,
  //       displayName: control.label,
  //       dataType: control.dataType,
  //       required: !!control.validators?.find(validator => validator.validatorName === 'required'),
  //       tooltip: control.tooltip
  //     };
  //     this.columnArray.push(column);
  //   });
  // }

  getDepartments(){
    this.api.request('departmentList', 'GET').subscribe({
      next: (response: any) => {
        this.departmentList = response;
      },
      error: (error: any) => this._sdwsToastService.showError(error.message)

    });
  }

  addDepartment(data: any){
    this.api.request('departmentList', 'POST', data).subscribe({
      next: (response: any) => {
        if (response.message == 'Added Successfully'){
          this._sdwsToastService.showSuccess('Department added successfully.');
          this.addService.closeModal();
        }
        else{
          this._sdwsToastService.showError(response.message);
        }
      },
      complete: () => this.getDepartments(),
      error: (error: any) => this._sdwsToastService.showError(error.message)
    });

  }

  editDepartment(data: any){
    this.api.request('departmentList', 'PUT', data).subscribe({
      next: (response: any) => {
      console.log("edit resp: ", response)
      if (response.message == 'Updated Successfully'){
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

  deleteDepartment(data: any){
    console.log("dept id: ", data.payrolldepartmentS_ID);
    this.api.request('deleteDepartment', 'DELETE', undefined, data.payrolldepartmentS_ID).subscribe({
      next: (response: any) => {
        console.log("response: ", response);
        if (response.message == 'Deleted Successfully'){
          this._sdwsToastService.showSuccess('Department deleted successfully.');
        }
        else{
          this._sdwsToastService.showError(response.message);
        }
      },
      error: (error: any) => this._sdwsToastService.showError(error.message),
      complete: () => this.getDepartments()
    });
  }
}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: DepartmentsComponent }];
