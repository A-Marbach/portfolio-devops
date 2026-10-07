import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('aboutSection')
  aboutSection!: ElementRef<HTMLElement>;

  started = signal(false);

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.started()) {
          this.started.set(true);
          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    this.observer.observe(this.aboutSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}