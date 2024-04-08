import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatestWith, interval, mergeMap, of, retry, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'sdwds-docs-route-listener',
  standalone: true,
  template: '',
})
export class RouteListenerComponent implements OnInit, OnDestroy {
  @Input() scrollTarget = 'sdwds-grid-content';
  private $windowLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private $navigationEnded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subs = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {}

  // we're listening to the window:load event to make sure we are not trying to navigate to a dom element that doesn't exist yet
  // this is only for the initial loading of a page if it already has a 'hash' in it
  // for instance, when navigating directly to http://some/url/path#withhash
  @HostListener('window:load', ['$event'])
  onWindowLoad() {
    this.$windowLoaded.next(true);
  }

  ngOnInit() {
    // store the NavigationEnd event for later use
    this.subs.add(
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.$navigationEnded.next(true);
        }
      })
    );

    // combine the $navigationEnded observable with the $windowLoaded observable to make sure we only execute the code when both are true
    this.subs.add(
      this.$navigationEnded.pipe(combineLatestWith(this.$windowLoaded)).subscribe(([navEnded, windowLoaded]) => {
        if (navEnded && windowLoaded) {
          this.scrollToAnchorOrTop();
        }
      })
    );
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.subs.unsubscribe();
  }

  private scrollToAnchorOrTop(): void {
    // decode the hash from the url (if any)
    const hash = decodeURIComponent(this.platformLocation.hash.replace(/^#/, ''));
    // define the element to scroll to (base on hash, scrollTarget, or the document.body)
    const el: HTMLElement =
      this.document.getElementById(hash) || this.document.getElementById(this.scrollTarget) || this.document.body;

    if (hash) {
      // since many pages use animations now and MutationObserver didn't work out (for me, so far)
      // let's abuse RXJS to "ping" for the node to be created
      const source = interval(250);
      const example = source.pipe(
        mergeMap((_) => {
          const target = this.document.getElementById(hash);
          if (target) return of(target);
          else return throwError(() => new Error('element not found'));
        }),
        retry(4)
      );

      const innerSub = example.subscribe({
        next: (target) => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          innerSub.unsubscribe();
        },
      });
    } else {
      el.scrollTo(0, 0);
    }
  }
}
