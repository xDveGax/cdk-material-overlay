import { Component, Inject, HostListener, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, group, query } from '@angular/animations';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

const ESCAPE = 27;
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'file-preview-overlay',
  template: `
    <tm-file-preview-overlay-toolbar>
      <mat-icon>description</mat-icon>
      {{ image.name }}
    </tm-file-preview-overlay-toolbar>

    <div class="overlay-content"
         [@slideContent]="animationState"
         (@slideContent.start)="onAnimationStart($event)"
         (@slideContent.done)="onAnimationDone($event)">
      <div class="spinner-wrapper" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <img [@fade]="loading ? 'fadeOut' : 'fadeIn'" (load)="onLoad($event)" [src]="image.url">
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin: 0;
      padding: 1em;
    }

    .spinner-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
    }

    .overlay-content {
      padding: 1em;
    }
  `],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('* => fadeIn', animate(ANIMATION_TIMINGS))
    ]),
    trigger('slideContent', [
      state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class FilePreviewOverlayComponent {

  loading = true;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public image: any) { }

  onLoad(event: Event) {
    this.loading = false;
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }
}
