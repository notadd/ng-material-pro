import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransferItemNode } from './interface';

@Component({
    selector: 'nm-transfer-picker-target',
    templateUrl: './transfer-picker-target.component.html',
    styleUrls: ['./transfer-picker-target.component.scss']
})
export class NmTransferPickerTargetComponent implements OnInit {

    @Input()
    selectedList: Array<TransferItemNode>;

    @Output()
    clearItemChange: EventEmitter<TransferItemNode>;

    constructor() {
        this.clearItemChange = new EventEmitter<TransferItemNode>();
    }

    ngOnInit() {
    }

    clearItem(item: TransferItemNode) {
        this.selectedList.splice(this.selectedList.indexOf(item), 1);
        this.clearItemChange.next(item);
    }

}
