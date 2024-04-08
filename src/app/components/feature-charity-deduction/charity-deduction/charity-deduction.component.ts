import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-charity-deduction',
  standalone: true,
  imports: [],
  templateUrl: './charity-deduction.component.html',
  styleUrl: './charity-deduction.component.scss'
})
export class CharityDeductionComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: CharityDeductionComponent }];