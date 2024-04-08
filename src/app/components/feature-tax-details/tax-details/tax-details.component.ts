import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-tax-details',
  standalone: true,
  imports: [],
  templateUrl: './tax-details.component.html',
  styleUrl: './tax-details.component.scss'
})
export class TaxDetailsComponent {

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: TaxDetailsComponent }];