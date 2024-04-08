import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-pensions',
  standalone: true,
  imports: [],
  templateUrl: './pensions.component.html',
  styleUrl: './pensions.component.scss'
})
export class PensionsComponent {

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PensionsComponent }];