import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// rest of imports
import { NgxChartsModule, LegendPosition, NumberCardModule, BoxChartModule, BoxChartMultiSeries } from '@swimlane/ngx-charts';  // added
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // added

@Component({
  selector: 'app-allowances',
  standalone: true,
  imports: [
    // added
    NgxChartsModule, NumberCardModule, BoxChartModule],
  templateUrl: './allowances.component.html',
  styleUrl: './allowances.component.scss'
})
export class AllowancesComponent {
  openJobCountByLocationData: any[] = [];
  pieChartData: any[] = [];
  numberCard: any[] = [];
  openDeptGroupLst: any[] = [];

  analyticSummary: AnalyticsSummary = {
    totalApplication: 0,
    hiredCandidate: 0,
    rejectedCandidate: 0,
    inProgressCandidate: 0,
    avgHiringTime: 0
  };


  valueFormatting: any; // Define valueFormatting property
  labelFormatting: any; // Define labelFormatting property

  legendPosition: LegendPosition = 'right' as LegendPosition;
  //analyticSummary: AnalyticsSummary [] = [];

  boxChartData: BoxChartMultiSeries;



 // Dummy data for the bar chart
 barChartData = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 40632,

      },
      {
        "name": "2000",
        "value": 36953,

      },
      {
        "name": "1990",
        "value": 31476,
        "extra": {
          "code": "de"
        }
      }
    ]
  },
  {
    "name": "United States",
    "series": [
      {
        "name": "2010",
        "value": 0,
        "extra": {
          "code": "us"
        }
      },
      {
        "name": "2000",
        "value": 45986,
        "extra": {
          "code": "us"
        }
      },
      {
        "name": "1990",
        "value": 37060,
        "extra": {
          "code": "us"
        }
      }
    ]
  },
  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 36745,
        "extra": {
          "code": "fr"
        }
      },
      {
        "name": "2000",
        "value": 34774,
        "extra": {
          "code": "fr"
        }
      },
      {
        "name": "1990",
        "value": 29476,
        "extra": {
          "code": "fr"
        }
      }
    ]
  },
  {
    "name": "United Kingdom",
    "series": [
      {
        "name": "2010",
        "value": 36240,
        "extra": {
          "code": "uk"
        }
      },
      {
        "name": "2000",
        "value": 32543,
        "extra": {
          "code": "uk"
        }
      },
      {
        "name": "1990",
        "value": 26424,
        "extra": {
          "code": "uk"
        }
      }
    ]
  }
];


  constructor(private http: HttpClient) {

    this.openDeptGroupLst = [];
    this.pieChartData = [];

    this.pieChartData = [];

    this.numberCard = [];

    this.boxChartData = [
      {
        'name': 'Series 1',
        'series': [
          { 'name': 'A', 'value': 10 },
          { 'name': 'B', 'value': 20 },
          { 'name': 'C', 'value': 15 },
          { 'name': 'D', 'value': 25 },
          { 'name': 'E', 'value': 30 },
          // Add more data points as needed
        ]
      },
      {
        'name': 'Series 2',
        'series': [
          { 'name': 'A', 'value': 15 },
          { 'name': 'B', 'value': 25 },
          { 'name': 'C', 'value': 10 },
          { 'name': 'D', 'value': 20 },
          { 'name': 'E', 'value': 35 },
          { 'name': 'E', 'value': 35 },
          { 'name': 'E', 'value': 35 },
          { 'name': 'E', 'value': 35 },
          // Add more data points as needed
        ]
      },
      // Add more series as needed
    ];

  }

  ngOnInit(): void {
    this.fetchAnalyticsData();
    this.fetchAnalyticsSummary();
    this.getOpenJobByDeptGroupedByCountry();
  }



  getOpenJobByDeptGroupedByCountry(): void {
    this.http.get<any>('https://localhost:7063/api/Analytics/GetOpenJobByDeptGroupedByCountry')
      .subscribe(
        (data) => {
          this.barChartData = this.transformData(data);
        },
        (error) => {
          console.error('Error fetching analytics data:', error);
        }
      );
  }

  transformData(data: any[]): any[] {
    return data.map(item => ({
      name: item.countryName,
      series: item.analyticsData.map((analytics: any) => ({  // Explicitly type the analytics parameter
        name: analytics.name,
        value: analytics.value
      }))
    }));
  }





  fetchAnalyticsData() {
    this.http.get<any>('https://localhost:7063/api/Analytics')
      .subscribe(
        (data) => {
          // Assign the received data to your component property
          this.openJobCountByLocationData = data.openJobByLocation;

          console.log('DATA openJobCountByLocationData', data)


          this.pieChartData = [
          ];

          // Additional data array
          const additionalData = [
            { "name": "Data Analysis", "value": 2, "additionalInfo": null },
            { "name": "Engineering", "value": 1, "additionalInfo": null },
            { "name": "Finance", "value": 1, "additionalInfo": null },
            { "name": "Human Resources", "value": 1, "additionalInfo": null }
          ];
          // Transform additional data into format expected by ngx-charts-pie-chart
          const transformedData = additionalData.map(item => ({ 'name': item.name, 'value': item.value }));
          // Concatenate existing pieChartData with transformed additional data
          this.pieChartData = this.pieChartData.concat(transformedData);

        },
        (error) => {
          console.error('Error fetching analytics data:', error);
        }
      );
  }

  fetchAnalyticsSummary() {
    this.http.get<any>('https://localhost:7063/api/Analytics/GetAnalyticsSummary')
      .subscribe(
        (data) => {
          // Assign the received data to your component property
          this.analyticSummary = data;

          // Format the data for ngx-charts-number-card
          this.numberCard = [
            { name: 'Total Applications', value: this.analyticSummary.totalApplication },
            { name: 'Hired Candidates', value: this.analyticSummary.hiredCandidate },
            { name: 'Rejected Candidates', value: this.analyticSummary.rejectedCandidate },
            { name: 'In Progress Candidates', value: this.analyticSummary.inProgressCandidate },
            { name: 'Average Hiring Time', value: this.analyticSummary.avgHiringTime }
          ];

          console.log('this.analyticSummary', this.analyticSummary)
        },
        (error) => {
          console.error('Error fetching analytics data:', error);
        }
      );
  }



  customDataLabelStyle(item: any) {
    // Concatenate the name and value with a colon
    return `${item.name}: ${item.value}`;
  }



  // dataset = [
  //   { name: "X", value: 1 },
  //   { name: "Y", value: 2 }
  // ];

  // data = [
  //   { 'name': "> 95", 'value': 765 },
  //   { 'name': "90 - 94", 'value': 123 },
  //   { 'name': "< 90", 'value': 84 }
  // ]


}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: AllowancesComponent }];
export interface AnalyticsSummary {
  totalApplication: number;
  hiredCandidate: number;
  rejectedCandidate: number;
  inProgressCandidate: number;
  avgHiringTime: number;
}

export interface AnalyticsDataItem {
  name: string;
  value: number;
  additionalInfo: any; // Adjust the type if necessary
}
