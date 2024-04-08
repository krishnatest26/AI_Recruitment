import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-policy-manager',
  standalone: true,
  imports: [],
  templateUrl: './policy-manager.component.html',
  styleUrl: './policy-manager.component.scss'
})
export class PolicyManagerComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: PolicyManagerComponent }];