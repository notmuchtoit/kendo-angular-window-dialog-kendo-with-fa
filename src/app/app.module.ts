import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';
import { WindowDialogComponent } from './window-dialog/window-dialog.component';
import { IntroComponent } from './intro/intro.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { ImageViewerModule } from 'ngx-image-viewer';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WindowModule,
    ButtonsModule,
    ImageViewerModule.forRoot(),
    FontAwesomeModule,
  ],
  declarations: [AppComponent, WindowDialogComponent, IntroComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
