import { Component, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { NmSlideComponent } from './slide.component';
import { Direction } from './carousel.enum';

export interface SlideEventArgs {
    carousel: NmCarouselComponent;
    slide: NmSlideComponent;
}

let NEXT_ID = 0;

@Component({
    selector: 'nm-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class NmCarouselComponent implements OnInit, OnDestroy {

    /* 组件 id */
    @HostBinding('attr.id')
    @Input()
    public id = `nm-carousel-${NEXT_ID++}`;

    /* 是否循环滚动 */
    @Input() public isLoop: boolean;

    /* slide 转换间隔时间 */
    @Input()
    get interval(): number {
        return this._interval;
    }

    set interval(value: number) {
        this._interval = +value;
        this._restartInterval();
    }

    /* 是否显示控制按钮 */
    @Input() public isControls: boolean;

    /* Slide 转换时触发的事件 */
    @Output() public slideChanged = new EventEmitter<SlideEventArgs>();

    /* 添加新的 Slide 触发的事件 */
    @Output() public slideAdded = new EventEmitter<SlideEventArgs>();

    /* 移除 Slide 触发的事件 */
    @Output() public slideRemoved = new EventEmitter<SlideEventArgs>();

    /* 轮播停止转换触发的事件 */
    @Output() public carouselStopped = new EventEmitter<NmCarouselComponent>();

    /* 轮播开始转换触发的事件 */
    @Output() public carouselPlaying = new EventEmitter<NmCarouselComponent>();

    public slides: Array<NmSlideComponent>;
    private _totalSlides: number;
    private _currentSlide: NmSlideComponent;
    private _destroyed: boolean;
    private _playing: boolean;
    private _interval: number;
    private _lastInterval: any;

    constructor(
        private element: ElementRef
    ) {
        this.isLoop = true;
        this.slides = [];
        this.isControls = true;
        this._totalSlides = 0;
        this._interval = 5000;
    }

    public get totalSlide(): number {
        return this._totalSlides;
    }

    public get currentSlideIndex(): number {
        return !this._currentSlide ? 0 : this._currentSlide.index;
    }

    public get nativeElement(): any {
        return this.element.nativeElement;
    }

    public get isPlaying(): boolean {
        return this._playing;
    }

    public get isDestroyed(): boolean {
        return this._destroyed;
    }

    ngOnInit() {
    }

    /**
     * 添加新的 Slide
     * @param slide
     */
    public addSlide(slide: NmSlideComponent) {
        slide.index = this._totalSlides;
        this.slides.push(slide);
        this._totalSlides += 1;

        if (this._totalSlides === 1 || slide.active) {
            this.select(slide);
            if (this._totalSlides === 1) {
                this.play();
            }
        } else {
            slide.active = false;
            slide.state = 'hide';
        }

        this.slideAdded.emit({ carousel: this, slide });
    }

    /* 移除 Slide */
    public remove(slide: NmSlideComponent) {
        if (slide && slide === this.getSlide(slide.index)) { // check if the requested slide for delete is present in the carousel
            if (slide.index === this.currentSlideIndex) {
                slide.active = false;
                this.nextSlide();
            }

            this.slides.splice(slide.index, 1);
            this._totalSlides -= 1;

            if (!this.totalSlide) {
                this._currentSlide = void (0);
                return;
            }

            for (let i = 0; i < this.totalSlide; i++) {
                this.slides[i].index = i;
            }

            this.slideRemoved.emit({ carousel: this, slide});
        }
    }

    /**
     * 切换上一个Slide
     */
    public previousSlide(): void {
        const index = this.currentSlideIndex - 1 < 0 ?
            this.totalSlide - 1 : this.currentSlideIndex - 1;

        if (!this.isLoop && index === this.totalSlide - 1) {
            this.stop();
            return;
        }

        return this.select(this.getSlide(index), Direction.PREV);
    }

    /**
     * 切换下一个Slide
     */
    public nextSlide(): void {
        const index = (this.currentSlideIndex + 1) % this.totalSlide;

        if (index === 0 && !this.isLoop) {
            this.stop();
            return;
        }

        return this.select(this.getSlide(index), Direction.NEXT);
    }

    /**
     * 获取指定 index 的Slide
     * @param index
     */
    public getSlide(index: number): NmSlideComponent {
        for (const each of this.slides) {
            if (each.index === index) {
                return each;
            }
        }
    }

    /**
     * 设置 slide 过渡阶段的方向
     */
    public select(slide: NmSlideComponent, direction: Direction = Direction.NONE) {
        const newIndex = slide.index;
        if (direction === Direction.NONE) {
            direction = newIndex > this.currentSlideIndex ? Direction.NEXT : Direction.PREV;
        }

        if (slide && slide !== this._currentSlide) {
            this.moveTo(slide, direction);
        }
    }

    /**
     * 移动 Slide
     * @param slide
     * @param direction
     */
    private moveTo(slide: NmSlideComponent, direction: Direction) {
        if (this._destroyed) {
            return;
        }

        slide.direction = direction;
        slide.state = 'show';
        slide.active = true;

        if (this._currentSlide) {
            this._currentSlide.direction = direction;
            this._currentSlide.state = 'hide';
            this._currentSlide.active = false;
        }

        this._currentSlide = slide;
        this.slideChanged.emit({ carousel: this, slide });
        this._restartInterval();
        requestAnimationFrame(() => this.nativeElement.focus());
    }

    private _resetInterval() {
        if (this._lastInterval) {
            clearInterval(this._lastInterval);
            this._lastInterval = void (0);
        }
    }

    private _restartInterval() {
        this._resetInterval();

        if (!isNaN(this.interval) && this.interval > 0) {
            this._lastInterval = setInterval(() => {
                const tick = +this.interval;
                if (this._playing && this.totalSlide && !isNaN(tick) && tick > 0) {
                    this.nextSlide();
                } else {
                    this.stop();
                }
            }, this.interval);
        }
    }

    @HostListener('mouseleave') public play() {
        if (!this.isPlaying) {
            this._playing = true;
            this.carouselPlaying.emit(this);
            this._restartInterval();
        }
    }

    @HostListener('mouseenter') stop() {
        if (this.isPlaying) {
            this._playing = false;
            this.carouselStopped.emit(this);
            this._restartInterval();
        }
    }

    ngOnDestroy() {
        this._destroyed = true;
        if (this._lastInterval) {
            clearInterval(this._lastInterval);
        }
    }
}
