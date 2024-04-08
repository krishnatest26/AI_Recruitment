import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-pension-schemes',
  standalone: true,
  imports: [],
  templateUrl: './pension-schemes.component.html',
  styleUrl: './pension-schemes.component.scss'
})
export class PensionSchemesComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PensionSchemesComponent }];