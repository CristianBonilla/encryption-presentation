import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@core/window.provider';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private readonly html: HTMLElement;
  private readonly body: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window) {
    this.html = document.documentElement;
    this.body = document.body;
  }

  ngOnInit() {
    this.html.classList.add('scrollbar-on');
    this.body.classList.add('sidebar-mini');
  }
}
