import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { WINDOW } from '@core/window.provider';

@Component({
  selector: 'de-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterViewInit {
  private readonly body: HTMLElement;

  @ViewChild('sidebar', { static: false })
  private readonly sidebarElementRef: ElementRef<HTMLElement>;

  sidebarElement: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window) {
    this.body = document.body;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const { nativeElement } = this.sidebarElementRef;
    this.sidebarElement = nativeElement;
  }

  minimize() {
    this.body.classList.toggle('sidebar-mini');
  }
}
