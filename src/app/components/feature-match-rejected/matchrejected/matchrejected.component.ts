import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-matchrejected',
  standalone: true,
  imports: [],
  templateUrl: './matchrejected.component.html',
  styleUrl: './matchrejected.component.scss'
})
export class MatchrejectedComponent {

}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: MatchrejectedComponent }];

