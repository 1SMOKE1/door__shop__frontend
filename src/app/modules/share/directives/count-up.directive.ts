import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, animationFrameScheduler, combineLatest, distinctUntilChanged, endWith, interval, map, switchMap, takeUntil, takeWhile } from 'rxjs';
import { DestroyCountUpService } from '@share-services/destroy-count-up.service';

@Directive({
  selector: '[dsfCountUp]'
})
export class CountUpDirective implements OnInit{

  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(2000);

  @Input('countUp') // input name is the same as selector name
  set count(count: number) {
    this.count$.next(count);
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  private readonly currentCount$ = combineLatest([
    this.count$,
    this.duration$,
  ]).pipe(
    switchMap(([count, animationDuration]) => {
      const frameDuration = 1000 / 60; // 60 frames per second
      const totalFrames = Math.round(animationDuration / frameDuration);
  
      // interval falls back to `asyncScheduler`
      // because the `frameDuration` is different from 0
      return interval(frameDuration, animationFrameScheduler).pipe(
        // calculate progress
        map((currentFrame) => currentFrame / totalFrames), 
        // complete when progress is greater than 1
        takeWhile((progress) => progress <= 1),
        // apply quadratic ease-out function
        map((progress) => progress * (2 - progress)),
        // calculate current count
        map((progress) => Math.round(progress * count)),
        // make sure that last emitted value is count
        endWith(count),
        distinctUntilChanged()
      );
    })
  );

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly destroy$: DestroyCountUpService
  ) {}

  ngOnInit(): void {
    this.displayCurrentCount();
  }

  private displayCurrentCount(): void {
    this.currentCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentCount) => {
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          currentCount
        );
      });
  }

}
