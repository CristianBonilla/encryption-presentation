import { Directive, ContentChild, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { WINDOW } from '@core/window.provider';
import { EVENT_END, EventEnd, TransitionEvent } from '@core/event-end';
import { SidebarComponent } from '@view/sidebar/sidebar.component';
import { NavbarComponent } from '@view/navbar/navbar.component';

@Directive({
  selector: 'deWrapper.wrapper'
})
export class WrapperDirective implements AfterViewInit {
  @ContentChild(NavbarComponent, { static: false })
  private readonly navbar: NavbarComponent;

  @ContentChild(SidebarComponent, { static: false })
  private readonly sidebar: SidebarComponent;

  private readonly html: HTMLElement;
  private readonly body: HTMLElement;
  private readonly transitionEnd: TransitionEvent;

  private toggleElement: HTMLElement;
  private sidebarElement: HTMLElement;
  private sidebarVisible = false;

  constructor(
    @Inject(WINDOW) { document }: Window,
    @Inject(EVENT_END) { transitionEnd },
    private renderer: Renderer2) {
    const { documentElement, body } = document;
    this.html = documentElement;
    this.body = body;
    this.transitionEnd = transitionEnd;
  }

  ngAfterViewInit() {
    this.toggleElement = this.navbar.toggleElement;
    this.sidebarElement = this.sidebar.sidebarElement;
    const buttonElement = this.toggleElement.querySelector('button');
    buttonElement.addEventListener('click', () => {
      if (this.sidebarVisible) {
        this.hideSidebar();
      } else {
        this.renderer.addClass(this.html, 'nav-open');
        this.sidebarElement.addEventListener(this.transitionEnd, () => {
          this.renderer.addClass(this.toggleElement, 'toggled');
          const getBodyClickElement = this.bodyClickElement();
          getBodyClickElement.addEventListener('click', () => {
            this.hideSidebar();
          }, { once: true });
        }, { once: true });
        this.sidebarVisible = true;
      }
    }, false);
  }

  private hideSidebar() {
    this.renderer.removeClass(this.html, 'nav-open');
    this.sidebarElement.addEventListener(this.transitionEnd, () => {
      this.renderer.removeClass(this.toggleElement, 'toggled');
      const getBodyClickElement = this.bodyClickElement();
      this.renderer.removeChild(this.body, getBodyClickElement);
    }, { once: true });
    this.sidebarVisible = false;
  }

  private bodyClickElement(): Element {
    const getBodyClickElement = this.body.querySelector('#bodyClick');
    if (getBodyClickElement) {
      return getBodyClickElement;
    } else {
      const bodyClickElement = this.renderer.createElement('div') as HTMLElement;
      bodyClickElement.id = 'bodyClick';
      this.renderer.appendChild(this.body, bodyClickElement);

      return this.body.querySelector('#bodyClick');
    }
  }
}
