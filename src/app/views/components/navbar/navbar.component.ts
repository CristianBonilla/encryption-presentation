import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { WINDOW } from '@core/window.provider';

@Component({
  selector: 'de-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar', { static: false })
  private readonly navbarElementRef: ElementRef<HTMLElement>;

  private navbarElement: HTMLElement;
  private expandElement: HTMLElement;
  private isExpanded = false;

  toggleElement: HTMLElement;

  constructor(@Inject(WINDOW) private window: Window) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.navbarElement = this.navbarElementRef.nativeElement;
    this.toggleElement = this.navbarElement.querySelector('.navbar-toggle');
    this.expandElement = this.navbarElement.querySelector('[data-target="#navigation"]');
    this.window.addEventListener('resize', () => {
      this.navbarCollapseToggle();
    }, false);
  }

  expand() {
    this.isExpanded = !this.isExpanded;
    this.expandElement.setAttribute('aria-expanded', `${ this.isExpanded }`);
    this.navbarCollapseToggle();
  }

  private navbarCollapseToggle() {
    const width = this.window.innerWidth;
    const classList = this.navbarElement.classList;
    if (this.isExpanded && width <= 991) {
      if (classList.contains('navbar-transparent') && !classList.contains('bg-white')) {
        classList.add('bg-white');
        classList.remove('navbar-transparent');
      }
    } else {
      if (classList.contains('bg-white') && !classList.contains('navbar-transparent')) {
        classList.add('navbar-transparent');
        classList.remove('bg-white');
      }
    }
  }
}
