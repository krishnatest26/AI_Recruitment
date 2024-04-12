import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private candidateId!: number;
  private jobId!: number;

  setCandidateId(id: number) {
    this.candidateId = id;
  }

  getCandidateId(): number {
    return this.candidateId;
  }

  setJobId(id: number) {
    this.jobId = id;
  }

  getJobId(): number {
    return this.jobId;
  }
}
