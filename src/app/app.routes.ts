import { Routes } from '@angular/router';
import { JobComponent } from './components/feature-job/job/job.component';

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
    path: 'payrollcompanydetails/departments',
    loadChildren: () => import('./components/feature-departments/departments/departments.component').then((m) => m.FEAT_ROUTES),
  },

  {
    path: 'payrollcompanydetails/allowances',
    loadChildren: () => import('./components/feature-allowances/allowances/allowances.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/deductions',
    loadChildren: () => import('./components/feature-deductions/deductions/deductions.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/pensions',
    loadChildren: () => import('./components/feature-pensions/pensions/pensions.component').then((m) => m.FEAT_ROUTES),
  }
  ,
  {
    path: 'payrollcompanydetails/calculationcontrols',
    loadChildren: () => import('./components/feature-calculation-controls/calculation-controls/calculation-controls.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/charitydeduction',
    loadChildren: () => import('./components/feature-charity-deduction/charity-deduction/charity-deduction.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/earningsaccumulators',
    loadChildren: () => import('./components/feature-earnings-accumulators/earnings-accumulators/earnings-accumulators.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/holiday',
    loadChildren: () => import('./components/feature-holiday/holiday/holiday.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/miscellaneoustables',
    loadChildren: () => import('./components/feature-miscellaneous-tables/miscellaneous-tables/miscellaneous-tables.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/pensionbanding',
    loadChildren: () => import('./components/feature-pension-banding/pension-banding/pension-banding.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/pensionschemes',
    loadChildren: () => import('./components/feature-pension-schemes/pension-schemes/pension-schemes.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/pensionspecialcalculationaccumulator',
    loadChildren: () => import('./components/feature-pension-special-calculation-accumulator/pension-special-calculation-accumulator/pension-special-calculation-accumulator.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/policymanager',
    loadChildren: () => import('./components/feature-policy-manager/policy-manager/policy-manager.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/taxdetails',
    loadChildren: () => import('./components/feature-tax-details/tax-details/tax-details.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/controlcalendars',
    loadChildren: () => import('./components/feature-control-calendars/control-calendars/control-calendars.component').then((m) => m.FEAT_ROUTES),
  },
  {
    path: 'payrollcompanydetails/payrollconfiguration',
    loadChildren: () => import('./components/feature-payroll-configuration/payroll-configuration/payroll-configuration.component').then((m) => m.FEAT_ROUTES),
  }


  ,
  {
    path: 'job/applyjob',
    component: JobComponent
  }
];

