import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-deductions',
  standalone: true,
  imports: [],
  templateUrl: './deductions.component.html',
  styleUrl: './deductions.component.scss'
})
export class DeductionsComponent {

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: DeductionsComponent }];