import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatListModule, MatIconModule, MatButtonModule } from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';
import { FilePreviewOverlayService } from './file-preview-overlay.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule
  ],
  declarations: [ AppComponent, FilePreviewOverlayComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    FilePreviewOverlayService
  ],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class AppModule { }
