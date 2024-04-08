import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// import { SdwdsSidenavComponent, SdwdsSidenavItemComponent} from '@sdworx/sdwds/sidenav'


import {
  SdwdsHeaderComponent,
  SdwdsHeaderNavbarComponent,
  SdwdsHeaderNavbarDividerComponent,
  SdwdsHeaderNavbarItemComponent,
} from '@sdworx/sdwds/header';
import {
  SdwdsHeaderProfileButtonComponent,
  SdwdsHeaderProfileComponent,
  SdwdsHeaderProfileLinkComponent,
  SdwdsHeaderProfileListComponent,
  SdwdsHeaderProfileSelectComponent,
} from '@sdworx/sdwds/header-profile';
import { SdwdsLoadingBarComponent } from '@sdworx/sdwds/loading';
import { SdwdsNotificationComponent } from '@sdworx/sdwds/notification';
import { RouteListenerComponent } from '../app/components/route-listener/route-listener.component'
import { SideNavigationComponent } from '../app/components/layouts/navigation/side-navigation/side-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouteListenerComponent,
    SideNavigationComponent,
    SdwdsHeaderComponent,
    SdwdsHeaderNavbarComponent,
    SdwdsHeaderNavbarItemComponent,
    SdwdsHeaderNavbarDividerComponent,
    SdwdsHeaderComponent,
    SdwdsHeaderProfileComponent,
    SdwdsHeaderProfileButtonComponent,
    SdwdsHeaderProfileLinkComponent,
    SdwdsHeaderProfileSelectComponent,
    SdwdsHeaderProfileListComponent,
    NgbDropdownModule,
    SdwdsLoadingBarComponent,
    SdwdsNotificationComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  appName = 'AI Recruitment';
  // componentFeatureNavigation = compList;
  // componentFeatureNavigation = "";
  languages: KeyValue<string, string>[] = [
    { key: 'de', value: 'Deutsch' },
    { key: 'en', value: 'English' },
    { key: 'nl', value: 'Nederlands' },
    { key: 'fr', value: 'Français' },
  ];
  selectedLanguage: KeyValue<string, string> = this.languages[1];

  ngOnInit(): void {

  }
}
