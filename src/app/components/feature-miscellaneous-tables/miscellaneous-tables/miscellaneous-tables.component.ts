import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-miscellaneous-tables',
  standalone: true,
  imports: [],
  templateUrl: './miscellaneous-tables.component.html',
  styleUrl: './miscellaneous-tables.component.scss'
})
export class MiscellaneousTablesComponent {

}
export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: MiscellaneousTablesComponent }];