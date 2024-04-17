import { Routes } from '@angular/router';
import { JobComponent } from './components/feature-job/job/job.component';
import { ManagejobComponent } from './components/feature-manage-job/managejob/managejob.component';
import { ApplicationComponent } from './components/feature-application/application/application.component';
import { MatchrejectedComponent } from './components/feature-match-rejected/matchrejected/matchrejected.component';
import { MatchcandidatejobComponent } from './components/feature-match-candidate-job/matchcandidatejob/matchcandidatejob.component';

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
  },
  {
    path: 'application/viewapplication',
    component: ApplicationComponent
  },
  {
    path: 'rejected_candidate_matching',
    component: MatchrejectedComponent
  },
  {
    path: 'match_candidate_job',
    component: MatchcandidatejobComponent
  }
];

