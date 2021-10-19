import { Component, Input, EventEmitter, Output, ViewChild, HostListener } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { WindowComponent, DragResizeService } from '@progress/kendo-angular-dialog';
import { ViewEncapsulation } from '@angular/core';
import { offset } from '@progress/kendo-popup-common';

const ESC_KEY = 27;

@Component({
  selector: 'app-window-dialog',
  templateUrl: './window-dialog.component.html',
  styleUrls: ['./window-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('overlayAppear', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({opacity: .1}),
        animate('.3s cubic-bezier(.2, .6, .4, 1)')
      ])
    ]),
    trigger('dialogSlideInAppear', [
      state('in', style({transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({transform: 'translate(0, -10%)'}),
        animate('.3s cubic-bezier(.2, 1, .2, 1)')
      ])
    ])
  ]
})
export class WindowDialogComponent {

  /**
   * Specifies the text that is rendered in the title bar.
   */
  @Input() title: string;

  /**
   * Specifies the width.
   * The `width` property has to be set in pixels.
   */
  @Input() width: number;

  /**
   * Specifies the height.
   * The `height` property has to be set in pixels.
   */
  @Input() height: number;

  /**
   * Specifies the minimum width.
   * The `minWidth` property has to be set in pixels.
   */
  @Input() minWidth: number;

  /**
   * Specifies the minimum height.
   * The `minHeight` property has to be set in pixels.
   */
  @Input() minHeight: number;

  /**
   * Fires when the user clicks on the **Close** button.
   */
  @Output() close: EventEmitter<any> = new EventEmitter();

  /**
   * Fires when the Kendo-Window was resized by the user or if the state changed.
   */
  @Output() public resized: EventEmitter<any> = new EventEmitter();

  @ViewChild(WindowComponent, { static: false })
  windowComponent: WindowComponent;

  /**
   * Centers Kendo-Window to the middle of the screen
   */
  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  centerWindow() {
    const windowService = this.windowComponent['service'] as DragResizeService;

    if (!windowService) { return; }
    if (windowService.options.state === 'maximized') { return; }

    const wnd = windowService.windowViewPort;
    const wrapper = offset(windowService.window.nativeElement);

    const top =  Math.max(0, (wnd.height - wrapper.height) / 2);
    const left = Math.max(0, (wnd.width - wrapper.width) / 2);

    windowService.options.position = 'fixed';
    this.windowComponent.setOffset('top', top);
    this.windowComponent.setOffset('left', left);
  }

  @HostListener('keydown', ['$event'])
  public onComponentKeydown(event: KeyboardEvent): void {

    // don't fix .keyCode to keep IE11 support
    // tslint:disable-next-line: deprecation
    if (event.keyCode === ESC_KEY) {
      this.windowComponent.close.emit();
    }
  }
}
