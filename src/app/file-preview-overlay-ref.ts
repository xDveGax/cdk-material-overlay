import { OverlayRef } from '@angular/cdk/overlay';

export class FilePreviewOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
