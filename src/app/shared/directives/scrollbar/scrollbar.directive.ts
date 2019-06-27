import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Scrollbar } from '@shared/models/scrollbar';
import * as OverlayScrollbars from 'overlayscrollbars';

@Directive({
  selector: '[deScrollbar]'
})
export class ScrollbarDirective implements OnInit {
  private readonly element: HTMLElement;
  private readonly defaultOptions: OverlayScrollbars.Options;

  @Input('deScrollbar')
  scrollbar: Scrollbar;

  constructor({ nativeElement }: ElementRef<HTMLElement>) {
    this.element = nativeElement;
    this.defaultOptions = { };
  }

  ngOnInit() {
    let options = this.defaultOptions;
    if (this.scrollbar) {
      options = Object.assign(options, this.scrollbar.options ? this.scrollbar.options : { });
    }
    const scrollbarInstance = OverlayScrollbars(this.element, options);
    if (this.scrollbar.handler) {
      this.scrollbar.handler(this.element, scrollbarInstance);
    }
  }
}
