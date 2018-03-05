import { Component, Inject, HostListener, EventEmitter, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

const ESCAPE = 27;
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'file-preview-overlay',
  template: `
    <tm-file-preview-overlay-toolbar>
      <mat-icon>description</mat-icon>
      {{ video.name }}
    </tm-file-preview-overlay-toolbar>

    <div class="overlay-content"
         [@slideContent]="animationState"
         (@slideContent.start)="onAnimationStart($event)"
         (@slideContent.done)="onAnimationDone($event)">
      <div class="spinner-wrapper" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div class="video-container">
        <div id="embed"></div>
        <div class="video-info">
          <div class="title">
            <span class="mat-title">{{video.title}}</span>
            <span class="mat-body-2">mat-body-2:</span>
            <span class="mat-body-1">mat-body-1</span>
            <span class="mat-body-1">mat-body-1</span>
          </div>
          <div class="tags">
            <p class="mat-body-2">Tags: </p>
            {{video.tags}}
          </div>
          <div class="description">
            <p class="mat-body-2">Description: </p>
            {{video.description}}
          </div>
          <div class="cta">
            <button mat-raised-button>OK</button>
          </div>
        </div>
      </div>
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

    .video-container {
      background-color: white;
      width: 640px;
    }

    .video-info {
      padding: 10px 20px;
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
export class FilePreviewOverlayComponent implements OnInit {

  loading = true;

  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  videoUrl: string;
  endpoint = 'http://www.vimeo.com/api/oembed.json';
  callback = 'embedVideo';
  url: string;

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public video: any) { }

  ngOnInit() {
    this.loading = true;
    this.videoUrl = this.video.url;

    // All this will be indeed when the endpoint will be ready.
    this.url = this.endpoint + '?url=' + encodeURIComponent(this.videoUrl) + '&callback=' + this.callback + '&width=640';
    const embed = document.createElement('script');
    embed.setAttribute('type', 'text/javascript');
    embed.innerHTML = function embedVideo(video) {
      return document.getElementById('embed').innerHTML = video.html;
    };
    document.getElementsByTagName('head', ).item(0).appendChild(embed);

    const js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', this.url);
    document.getElementsByTagName('head', ).item(0).appendChild(js);
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
