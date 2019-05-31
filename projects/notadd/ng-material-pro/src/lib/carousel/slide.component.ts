import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

import { NmCarouselComponent } from './carousel.component';
import { Direction } from './carousel.enum';

@Component({
    selector: 'nm-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    animations: [
        trigger('animate', [
            state('show', style({
                opacity: 1,
                display: 'block'
            })),
            state('hide', style({
                opacity: 0,
                display: 'none'
            })),
            transition('hide => show', animate('1000ms ease')),
            transition('show => hide', animate('800ms ease-out'))
        ])
    ]
})
export class NmSlideComponent implements OnInit, OnDestroy {

    /**
     * Slide 在 Carousel 中的索引
     */
    @Input() public index: number;

    /**
     * Slide 方向
     */
    @Input() public direction: Direction;

    /**
     * Slide 激活状态
     */
    @HostBinding('class.active')
    @Input() public active: boolean;

    public state: string;

    constructor(
        private carousel: NmCarouselComponent
    ) {
    }

    ngOnInit() {
        this.carousel.addSlide(this);
    }

    ngOnDestroy() {
        this.carousel.remove(this);
    }
}
