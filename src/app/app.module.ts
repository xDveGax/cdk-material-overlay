import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';
import { FilePreviewOverlayService } from './file-preview-overlay.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilePreviewOverlayToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  declarations: [ AppComponent, FilePreviewOverlayComponent, FilePreviewOverlayToolbarComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    FilePreviewOverlayService
  ],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class AppModule { }
