import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@core/window.provider';
import { HandlerScrollbar, Scrollbar } from '@shared/models/scrollbar';

@Component({
  selector: 'de-sidebar-wrapper',
  templateUrl: './wrapper.component.html'
})
export class WrapperComponent implements OnInit {
  private readonly body: HTMLElement;
  readonly scrollbar: Scrollbar;

  constructor(@Inject(WINDOW) private window: Window) {
    const { document } = this.window;
    this.body = document.body;
    const handler = this.updateScrollbar.bind(this) as HandlerScrollbar;
    this.scrollbar = {
      options: {
        overflowBehavior: {
          x: 'visible-hidden'
        }
      },
      handler
    };
  }

  ngOnInit() {
    this.body.classList.add('sidebar-mini');
  }

  private updateScrollbar(element: HTMLElement, overlay: OverlayScrollbars) {
    const getAllCollapses = element.querySelectorAll('.collapse');
    const collapses = Array.from(getAllCollapses);
    collapses.forEach(c => {
      const $this = $(c);
      $this.on('show.bs.collapse', () => {
        collapses.filter(s => s.classList.contains('show'))
          .forEach(h => $(h).collapse('hide'));
      });
      let interval: NodeJS.Timer;
      $this.on('show.bs.collapse hide.bs.collapse', () =>
        interval = setInterval(() => overlay.update(true), 10))
      .on('shown.bs.collapse hidden.bs.collapse', () =>
        clearInterval(interval));
    });
  }
}
