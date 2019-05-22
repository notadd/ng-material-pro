import { Component, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TransferFilterItem, TransferItemFlatNode, TransferItemNode } from './interface';
import { NmTransferPickerService } from './transfer-picker.service';
import { NmTransferPickerSourceComponent } from './transfer-picker-source.component';

@Component({
    selector: 'nm-transfer-picker',
    templateUrl: './transfer-picker.component.html',
    styleUrls: ['./transfer-picker.component.scss']
})
export class NmTransferPickerComponent implements OnInit, AfterViewInit {

    @Input()
    title: string;

    @Input()
    filterable: boolean;

    @Input()
    searchable: boolean;

    @Input()
    searchPlaceholder: string;

    @Input()
    dataSource: Array<TransferItemNode>;

    @Input()
    filters: Array<TransferFilterItem>;

    @Input()
    selectedValues: Array<string>;

    @Output()
    selectChange: EventEmitter<Array<TransferItemNode>>;

    @ViewChild(NmTransferPickerSourceComponent)
    source: NmTransferPickerSourceComponent;

    selectedList: Array<TransferItemNode>;

    constructor(
        private service: NmTransferPickerService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.filterable = true;
        this.dataSource = [];
        this.filters = [];
        this.selectedList = [];
        this.selectedValues = [];
    }

    ngOnInit() {
        this.service.dataSource = this.dataSource;
        this.service.selectedValues = this.selectedValues;

        this.service.sourceOptions = {
            title: this.title || '数据源',
            filterable: this.filterable || true,
            searchable: this.searchable || true,
            searchPlaceholder: this.searchPlaceholder || '搜索关键字',
            filters: this.filters || []
        };

        this.selectChange = new EventEmitter<Array<TransferItemNode>>();
    }

    ngAfterViewInit(): void {
        if (this.selectedValues.length) {
            this.pick();
            this.changeDetectorRef.detectChanges();
        }
    }

    pick() {
        this.selectedList = this.source.getSelectedList() || [];
        this.emitterChange();
    }

    reset() {
        if (this.selectedList.length) {
            this.selectedList = [];
            this.service.resetDataSource();
            this.emitterChange();
        }
    }

    onClearItemChange(item: TransferItemFlatNode) {
        if (item) {
            this.source.resetSelectedItem(item);
            this.emitterChange();
        }
    }

    private emitterChange() {
        this.selectChange.next(this.selectedList);
    }
}
