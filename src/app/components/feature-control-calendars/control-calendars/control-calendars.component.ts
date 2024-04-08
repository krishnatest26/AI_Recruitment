import { Component,inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { NgbTableComponent } from '../../shared/ngb-table/ngb-table.component';
import { controlCalendarsFormConfig } from '../../../constants/control-calendars-form.constant';
import { IForm } from '../../../interface/form.interface';
import { SdwdsToastService } from '@sdworx/sdwds/toast';
import { AddService } from '../../../services/add.service';

@Component({
  selector: 'app-control-calendars',
  standalone: true,
  imports: [NgbTableComponent],
  templateUrl: './control-calendars.component.html',
  styleUrl: './control-calendars.component.scss'
})
export class ControlCalendarsComponent {

  constructor(private addService: AddService) {}
  controlCalendarList: any[] = [];

  title: string= 'Confirmation';
  body: string= 'Are you sure you want to proceed?';
  yesLbl : string='Yes';
  noLbl: string='No';

  columnArray: any[] = [
    { fieldName: 'calno', displayName: 'Payroll Calendar No', dataType: 'nvarchar', length: 20, required: true, tooltip: 'Mandatory, Unique, takes values between 1-99' },
    { fieldName: 'calperD01', displayName: 'Period 01', dataType: 'nvarchar', length: 2, required: true, tooltip: 'Mandatory, Valid Tax Period (Value between 1 – 53 for WEEKLY, 4, 8, 12…...56, 53 for LUNAR, 1 – 12 for MONTHLY, 2, 4, 6, 8…52, 53, 54 for FORTNIGHTLY)' },
    { fieldName: 'calperD02', displayName: '02', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD03', displayName: '03', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD04', displayName: '04', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD05', displayName: '05', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD06', displayName: '06', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD07', displayName: '07', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD08', displayName: '08', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD09', displayName: '09', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD10', displayName: '10', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD11', displayName: '11', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD12', displayName: '12', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calperD13', displayName: '13', dataType: 'nvarchar', length: 2, required: false, tooltip: 'Optional' },
    { fieldName: 'calnotes', displayName: 'Payroll Calendar Notes', dataType: 'nvarchar', length: 'MAX', required: false, tooltip: 'Optional, Payroll Calendar Notes' },
  ];
  
api = inject(ApiService);
_sdwsToastService = inject(SdwdsToastService);

ControlCalendarForm = controlCalendarsFormConfig as IForm;

ngOnInit(): void{
this.getControlCalendars();
console.log(this.api.endpoints);

}

getControlCalendars(){
this.api.request('controlCalendarList', 'GET').subscribe({
  next: (response: any) => {
    this.controlCalendarList = response;
    console.log(response);
  },
  error: (error: any) => this._sdwsToastService.showError(error.message)

});
}

addControlCalendar(data: any){
console.log(' add data: ',data);
this.api.request('controlCalendarList', 'POST', data).subscribe({
  next: (response: any) => {
    if (response.message == 'Added Successfully.'){
      this._sdwsToastService.showSuccess('Control Calendar added successfully.');
      this.addService.closeModal();
      this.addService.resetButton();
    }
    else{
      this._sdwsToastService.showError(response.message);
    }
  },
  complete: () => this.getControlCalendars(),
  error: (error: any) => this._sdwsToastService.showError(error.message)
});

}

editControlCalendar(data: any){
console.log("edit dataaa: ", data);
this.api.request('controlCalendarList', 'PUT', data).subscribe({
  next: (response: any) => {
  console.log("edit resp: ", response)
  if (response.message == 'Updated Successfully.'){
    this._sdwsToastService.showSuccess('Control Calendar updated successfully.');
    this.addService.closeModal();
    this.addService.resetButton();
  
  }
  else {
    this._sdwsToastService.showError(response.message);
  }
},
complete: () => this.getControlCalendars(),
error: (error: any) => this._sdwsToastService.showError(error.message)
});
}

deleteControlCalendar(data: any){
console.log(data);
console.log("dept id: ", data.payrollcalendarS_ID);
this.api.request('deleteControlCalendar', 'DELETE', undefined, data.payrollcalendarS_ID).subscribe({
  next: (response: any) => {
    console.log("response: ", response);
    if (response.message == 'Deleted Successfully.'){
      this._sdwsToastService.showSuccess('Control Calendar deleted successfully.');
    }
    else{
      this._sdwsToastService.showError(response.message);
    }
  },
  error: (error: any) => this._sdwsToastService.showError(error.message),
  complete: () => this.getControlCalendars()
});
}
}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: ControlCalendarsComponent }];
