import { AfterViewInit, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Routes } from '@angular/router';
export enum KEY_CODE {
  DOWN_ARROW = 'ArrowDown',
  UP_ARROW = 'ArrowUp',
}



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  scrollContainer = document.querySelector('#sdwds-grid-content');

  // TODO: IDEA on mouse scroll auto scroll to next section
  @HostListener('wheel', ['$event'])
  public onMouseScroll(event: WheelEvent): void {
    if (event.deltaY < 0) return;
    // added following if to always return for now since the listener does not work correctly
    if (event.deltaY >= 0) return;
    //console.log(event.screenY);
    const target = event.target ? (event.target as Element) : null;
    if (target) {
      // what is y pos on screen
      // what is offsetTop
      // what is height of total
      const section = (event.target as Element).closest('section');
      const nextSection = section?.nextSibling as Element;

      if (section && nextSection && this.scrollContainer) {
        // console.log('-------------------');
        // console.log('ON SCROLL TRIGGERED');
        // console.log('-CONTAINER');
        // console.log('--ScrollTop:' + this.scrollContainer!.scrollTop);
        // console.log('--clientHeight:' + this.scrollContainer!.clientHeight);
        // console.log('-SECTION ' + section.id);
        // console.log('--offsetTop:' + section.offsetTop);
        // console.log('--height:' + section.getBoundingClientRect().height);
        // console.log('VAL SEMI SCREEN: ' + (this.scrollContainer!.clientHeight / 2));
        // console.log('----->VAL TO TRIGGER: ' + (this.scrollContainer!.scrollTop - section.offsetTop));
        if (this.scrollContainer.scrollTop - section.offsetTop > this.scrollContainer.clientHeight / 2) {
          this.scrollToElement(nextSection);
        }
      }
    }
  }

  // TODO: IDEA on keyevent auto scroll to next section
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event.currentTarget);

    if (event.key === KEY_CODE.DOWN_ARROW) {
      // scroll to next section
    }

    if (event.key === KEY_CODE.UP_ARROW) {
      // scroll to previous section
    }
  }

  scrollToElement(element: Element) {
    console.log('Scroll to:' + element.id);
    //element.scrollIntoView({ behavior: 'smooth' });
    element.scrollIntoView(true);
  }

  ngAfterViewInit() {
    this.setupScrollAnimation();
  }

  private setupScrollAnimation() {
    const observer = new IntersectionObserver(
      (articles) => {
        articles.forEach((article) => {
          article.target.classList.toggle('show-animation', article.isIntersecting);
          if (article.isIntersecting) observer.unobserve(article.target);
        });
      },
      {
        root: document.querySelector('#sdwds-grid-content '),
        threshold: 0.6,
        rootMargin: '120px',
      }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
  }
}

export const FEAT_ROUTES: Routes = [{ path: '', pathMatch: 'full', component: HomeComponent }];