import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.scss'
})
export class HolidayComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: HolidayComponent }];