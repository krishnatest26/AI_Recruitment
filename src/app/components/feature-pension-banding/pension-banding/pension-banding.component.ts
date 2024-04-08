import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-pension-banding',
  standalone: true,
  imports: [],
  templateUrl: './pension-banding.component.html',
  styleUrl: './pension-banding.component.scss'
})
export class PensionBandingComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PensionBandingComponent }];