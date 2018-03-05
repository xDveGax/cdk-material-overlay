import { InjectionToken } from '@angular/core';

import { Video } from './file-preview-overlay.service';

export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<Video>('FILE_PREVIEW_DIALOG_DATA');
