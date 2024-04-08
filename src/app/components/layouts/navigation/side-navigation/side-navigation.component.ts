import { Component, Input } from '@angular/core';
import { SdwdsSidenavComponent, SdwdsSidenavItemComponent } from '@sdworx/sdwds/sidenav';

import { SdwdsComponent } from '../side-navigation/types';

@Component({
  selector: 'sdwds-docs-side-navigation',
  standalone: true,
  imports: [SdwdsSidenavComponent, SdwdsSidenavItemComponent],
  templateUrl: './side-navigation.component.html',
})
export class SideNavigationComponent {
  @Input() componentNav?: SdwdsComponent[];

  navClicked(i: any) {
    console.log('top level callback for menu click ', i);
  }

  navToggled(i: any) {
    console.log('top level callback for menu toggle ', i);
  }
}
