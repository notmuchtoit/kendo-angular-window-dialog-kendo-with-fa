import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  windowOpen = false;
  lastAction = '';

  images = [
'https://picsum.photos/900/500/?random',
  ];

  yes() {
    this.lastAction = 'Yes';
    this.windowOpen = false;
  }

  no() {
    this.lastAction = 'No';
    this.windowOpen = false;
  }

  close() {
    this.lastAction = 'Close';
    this.windowOpen = false;
  }
}
