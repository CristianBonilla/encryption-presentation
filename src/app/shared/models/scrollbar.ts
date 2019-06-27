export type HandlerScrollbar = (element: HTMLElement, overlay: OverlayScrollbars) => void;

export interface Scrollbar {
  handler?: HandlerScrollbar;
  options?: OverlayScrollbars.Options;
}
