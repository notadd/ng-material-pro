import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    TransferFilterCondition,
    TransferFilterItem,
    TransferItemNode
} from '../../projects/notadd/ng-material-pro/src/public_api';

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

    /**
     * The Json object for transfer list data.
     */
    treeData: Array<TransferItemNode> = [
        {
            label: '常规',
            value: 'general',
            children: [
                {
                    label: '相等',
                    value: 'asise',
                    num: 1
                },
                {
                    label: '大于',
                    value: 'sllew',
                    num: 3
                },
                {
                    label: '相等大于',
                    value: 'asisew',
                    num: 3,
                    children: [
                        {
                            label: '相等大于的儿子',
                            value: 'asis22',
                        },
                        {
                            label: '相等大于的2儿子',
                            value: 'as22is22',
                        },
                    ]
                },
                {
                    label: '不相等不大于',
                    value: 'asi2s',
                    num: 1
                }
            ]
        },
        {
            label: '德甲',
            value: 'asisw',
            children: [
                {
                    label: 'A款',
                    value: 'asisww'
                }
            ]
        }
    ];

    selectedValues: Array<string> = ['asise', 'asisww'];

    filters: Array<TransferFilterItem> = [
        {
            label: '大于等于2',
            value: 2,
            condition: [TransferFilterCondition.MORE_THAN, TransferFilterCondition.EQUALS],
            field: 'num'
        }
    ];

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
