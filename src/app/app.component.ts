import { Component } from '@angular/core';

import { FilePreviewOverlayService } from './file-preview-overlay.service';
import { STATIC_FILE_DATE } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  files = STATIC_FILE_DATE;

  constructor(private previewDialog: FilePreviewOverlayService) { }

  showPreview(file) {
    this.previewDialog.open({
      image: file
    });
  }
}
