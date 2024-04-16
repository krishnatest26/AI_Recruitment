import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = 'https://localhost:7063/';

  private getAllJobUrl = 'https://localhost:7063/api/Job/GetAllOpenJobs';


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

  getAllJob(): Observable<any[]> {
    const url = `${this.baseUrl}api/Job/GetAllJobs`;
    return this.http.get<any[]>(url);
  }

  getJobApplications(): Observable<any[]> {
    const url = `${this.baseUrl}api/Job/GetAllCandidateJobApplication`;
    return this.http.get<any[]>(url);
  }

  applyForJob(candidateId: number, jobId: number): Observable<any> {

    const url = `${this.baseUrl}api/Job/ApplyForJob?candidateId=${candidateId}&jobId=${jobId}`;
    return this.http.post(url, {});
  }


  acceptApplication(candidateId: number, jobApplicationId: number, acceptanceReason: string): Observable<any> {
    const url = `${this.baseUrl}api/Job/AcceptJobApplication?candidateId=${candidateId}&jobApplicationId=${jobApplicationId}&acceptanceReason=${acceptanceReason}`;
    return this.http.post(url, {});
  }

  rejectApplication(candidateId: number, jobApplicationId: number, rejectionReason: string): Observable<any> {
    const url = `${this.baseUrl}api/Job/RejectJobApplication?candidateId=${candidateId}&jobApplicationId=${jobApplicationId}&rejectionReason=${rejectionReason}`;
    return this.http.post(url, {});
  }

}
export type endpointType = 'departmentList' | 'deleteDepartment' | 'controlCalendarList' | 'deleteControlCalendar' | 'baseDetailsList';
