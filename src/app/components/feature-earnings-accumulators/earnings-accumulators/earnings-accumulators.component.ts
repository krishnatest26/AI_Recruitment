import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-earnings-accumulators',
  standalone: true,
  imports: [],
  templateUrl: './earnings-accumulators.component.html',
  styleUrl: './earnings-accumulators.component.scss'
})
export class EarningsAccumulatorsComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: EarningsAccumulatorsComponent }];