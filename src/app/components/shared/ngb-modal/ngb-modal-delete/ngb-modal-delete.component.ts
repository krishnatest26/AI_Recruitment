import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddService } from '../../../../services/add.service';

@Component({
  selector: 'app-ngb-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './ngb-modal-delete.component.html',
  styleUrl: './ngb-modal-delete.component.scss'
})
export class NgbModalDeleteComponent {
  constructor( public modal: NgbActiveModal, private addService: AddService ) {}

  cancelDelete(event: Event) {
    event.preventDefault();
    this.addService.resetButton();
  }
}

