import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-calculation-controls',
  standalone: true,
  imports: [],
  templateUrl: './calculation-controls.component.html',
  styleUrl: './calculation-controls.component.scss'
})
export class CalculationControlsComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: CalculationControlsComponent }];