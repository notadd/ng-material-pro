import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'nm-cascade-bottom-sheet',
    templateUrl: './cascade-bottom-sheet.component.html',
    styleUrls: ['./cascade-bottom-sheet.component.scss']
})
export class NmCascadeBottomSheetComponent {

    selected = new FormControl(0);

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public root: any,
    ) {}

    clickHandle(event: Event): void {
        event.stopPropagation();
    }

}
