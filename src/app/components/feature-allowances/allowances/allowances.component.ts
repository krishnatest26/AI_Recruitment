import { Component } from '@angular/core';
import { Routes } from '@angular/router';

// rest of imports
import { NgxChartsModule, LegendPosition  }from '@swimlane/ngx-charts';  // added
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // added

@Component({
  selector: 'app-allowances',
  standalone: true,
  imports: [
      // added
    NgxChartsModule  ],
  templateUrl: './allowances.component.html',
  styleUrl: './allowances.component.scss'
})
export class AllowancesComponent {

  legendPosition: LegendPosition = 'right' as LegendPosition;


  title = 'barchartApp';
  chartData: any[] = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 180 },
    { name: 'May', value: 220 },
    { name: 'Jun', value: 250 },
    { name: 'Jul', value: 300 },
    { name: 'Aug', value: 280 },
    { name: 'Sep', value: 320 },
    { name: 'Oct', value: 350 },
    { name: 'Nov', value: 380 },
    { name: 'Dec', value: 400 }
  ];

  dataset = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];

    data = [
    { 'name' : "> 95", 'value' : 765 },
    {'name' : "90 - 94", 'value' : 123},
    {'name' : "< 90", 'value' : 84}
  ]

  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };
}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: AllowancesComponent }];
