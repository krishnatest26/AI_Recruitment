import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-allowances',
  standalone: true,
  imports: [],
  templateUrl: './allowances.component.html',
  styleUrl: './allowances.component.scss'
})
export class AllowancesComponent {

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: AllowancesComponent }];