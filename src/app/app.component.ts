import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    options: Array<any> = [{
        value: 'guide',
        label: '指南',
        children: [{
            value: 'design-principles',
            label: '设计原则',
            children: [{
                value: 'consistent',
                label: '一致',
            }, {
                value: 'feedback',
                label: '反馈',
            }, {
                value: 'efficiency',
                label: '效率',
            }, {
                value: 'controllable',
                label: '可控',
            }],
        }],
    }, {
        value: 'component',
        label: '组件',
        children: [{
            value: 'layout',
            label: 'Layout 布局',
            children: []
        }, {
            value: 'color',
            label: 'Color 色彩',
        }, {
            value: 'typography',
            label: 'Typography 字体',
        }],
    }, {
        value: 'form',
        label: 'Form',
        children: [{
            value: 'radio',
            label: 'Radio 单选框',
        }, {
            value: 'checkbox',
            label: 'Checkbox 多选框',
        }, {
            value: 'input',
            label: 'Input 输入框',
        }, {
            value: 'input-number',
            label: 'InputNumber 计数器',
        }, {
            value: 'select',
            label: 'Select 选择器',
        }, {
            value: 'cascader',
            label: 'Cascader 级联选择器',
        }],
    }];

    isHandset: Observable<boolean>;

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit() {
        this.isHandset = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(match => match.matches)
        );
    }

    changeHandle(event: { path: Array<string>, value: string }): void {
        console.log(event);
    }

}
