import { Component, HostBinding, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NmAlertIcons } from './icons.interface';

let NEXT_ID = 0;

@Component({
    animations: [
        trigger('animate', [
            state('show', style({
                opacity: 1
            })),
            transition('* => show', animate('.20s ease')),
            transition('show => *', animate('.40s ease-out'))
        ])
    ],
    selector: 'nm-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class NmAlertComponent implements OnInit {

    /*
     * 组件 id
     *
     */
    @HostBinding('attr.id')
    @Input()
    public id = `nm-alert-${NEXT_ID++}`;

    /*
     * Alert 状态 (success、info、warning、error)
     */
    @Input()
    public status: string;

    /*
     * 是否可以手动关闭 Alert, 默认为 true
     */
    @Input()
    public dismissible: boolean;

    /**
     * 是否显示图标, 默认为 true
     */
    @Input()
    public hasIcon: boolean;

    /**
     * Alert 是否可见
     */
    @Input()
    public isVisible: boolean;

    /**
     * Alert 可选图标
     */
    @Input()
    public set icon(value: NmAlertIcons) {
        this.icons = Object.assign(this.icons, {
            [this.status]: value
        });
    }

    /**
     * Alert 显示出来时触发的事件
     *
     * @memberOf NmAlertComponent
     */
    @Output()
    public shown = new EventEmitter<NmAlertComponent>();

    /**
     * Alert 隐藏时触发的事件
     *
     * @memberOf NmAlertComponent
     */
    @Output()
    public hidden = new EventEmitter<NmAlertComponent>();

    public icons: NmAlertIcons;

    constructor() {
        this.status = 'info';
        this.dismissible = true;
        this.hasIcon = true;
        this.icons = {
            success: 'check_circle',
            info: 'info',
            warning: 'warning',
            error: 'error'
        };
        this.isVisible = false;
    }

    ngOnInit() {
    }

    /**
     * 显示 Alert
     */
    public show() {
        this.isVisible = true;
        this.shown.emit(this);
    }

    /**
     * 隐藏 Alert
     */
    public hide() {
        this.isVisible = false;
        this.hidden.emit(this);
    }

    /**
     * 切换 Alert 的可见状态
     */
    public toggle() {
        this.isVisible ? this.hide() : this.show();
    }
}
