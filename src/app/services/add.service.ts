import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AddService {

  private closeModalSubject = new Subject<void>();
  private resetButtonSubject = new Subject<void>();
  private dataSubject = new Subject<any>();
  private payrollIdSubject = new Subject<string>(); // Subject for supplying payroll ID


  closeModal$ = this.closeModalSubject.asObservable();
  resetButton$ = this.resetButtonSubject.asObservable();
  payrollId$ = this.payrollIdSubject.asObservable(); // Observable for payroll ID


  onAdd: EventEmitter<any> = new EventEmitter<any>();
  onEdit: EventEmitter<any> = new EventEmitter<any>();

  data$: Observable<any> = this.dataSubject.asObservable();

  private editBaseDetailsSubject = new Subject<any>();
  editBaseDetails$: Observable<any> = this.editBaseDetailsSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  emitAdd(data: any) {
    this.onAdd.emit(data);
    return this.onAdd.asObservable();
  }
  emitEdit(data: any){
    this.onEdit.emit(data);
    return this.onEdit.asObservable();
  }
  closeModal() {
    this.closeModalSubject.next();
  }
  resetButton() {
    this.resetButtonSubject.next();
  }
  supplyPayrollId(payrollId: string) {
    this.payrollIdSubject.next(payrollId);
  }
  emitEditBaseDetails(data: any): void {
    this.editBaseDetailsSubject.next(data);
  }
  
}
