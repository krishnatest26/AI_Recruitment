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

  constructor(private http: HttpClient) {
    this.openJobCountByLocationData = [];
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
  }

  fetchAnalyticsData() {
    this.http.get<any>('https://localhost:7063/api/Analytics')
      .subscribe(
        (data) => {
          // Assign the received data to your component property
          this.openJobCountByLocationData = data.openJobByLocation;

          console.log('DATA openJobCountByLocationData', data)

          this.pieChartData = [
            { 'name': "Highest Job Application Received By Location: " + data.highestJobApplicationRecievedByLocation[0].name, 'value': data.highestJobApplicationRecievedByLocation[0].value },
            { 'name': "Highest Rejection Rate : " + data.highestRejectionRate[0].name , 'value': data.highestRejectionRate[0].value }


          ]

          console.log('pieChartData', this.pieChartData)
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
