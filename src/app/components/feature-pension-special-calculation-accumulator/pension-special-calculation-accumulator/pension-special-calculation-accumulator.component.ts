import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-pension-special-calculation-accumulator',
  standalone: true,
  imports: [],
  templateUrl: './pension-special-calculation-accumulator.component.html',
  styleUrl: './pension-special-calculation-accumulator.component.scss'
})
export class PensionSpecialCalculationAccumulatorComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PensionSpecialCalculationAccumulatorComponent }];