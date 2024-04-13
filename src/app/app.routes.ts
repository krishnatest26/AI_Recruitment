import { Routes } from '@angular/router';
import { JobComponent } from './components/feature-job/job/job.component';
import { ManagejobComponent } from './components/feature-manage-job/managejob/managejob.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/feature-home/home/home.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./components/feature-home/home/home.component').then((m) => m.FEAT_ROUTES),
  },

  {
    path: 'analytics',
    loadChildren: () => import('./components/feature-allowances/allowances/allowances.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'job/applyjob',
    component: JobComponent
  },

  {
    path: 'managejob/managejob',
    component: ManagejobComponent
  }
];

