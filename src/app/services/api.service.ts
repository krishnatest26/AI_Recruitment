import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = 'https://recruitmentassistantai20240324125846.azurewebsites.net/';

  private getAllJobUrl = 'https://recruitmentassistantai20240324125846.azurewebsites.net/api/Job/GetAllOpenJobs';


  http = inject(HttpClient);

  endpoints: {[endpoint: string]: string | any} = {
    departmentList: `${this.baseUrl}/api/Job/GetAllOpenJobs`,


    deleteDepartment: (departmentId: string) => `${this.baseUrl}PayrollDepartment?id=${departmentId}`,
    controlCalendarList: `${this.baseUrl}PayrollCalendar`,
    deleteControlCalendar: (controlCalendarId: string) => `${this.baseUrl}PayrollCalendar?id=${controlCalendarId}`,
    baseDetailsList: `${this.baseUrl}BaseDetails`,
  };

  request(url: endpointType, method: string, payload?: object, urlParams?: any){
    const finalUrl = (!urlParams) ? this.endpoints[url] : this.endpoints[url](urlParams);
    //console.log("final url: ", finalUrl);
    return (!payload) ? this.http.request(method, finalUrl) : this.http.request(method, finalUrl, {body: payload});

  }

  getAllActiveJob(): Observable<any[]> {
    return this.http.get<any[]>(this.getAllJobUrl);
  }

}
export type endpointType = 'departmentList' | 'deleteDepartment' | 'controlCalendarList' | 'deleteControlCalendar' | 'baseDetailsList';
