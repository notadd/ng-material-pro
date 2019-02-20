import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { OptionsInterface } from '../options.interface';

@Component({
    selector: 'nm-cascade-bottom-sheet',
    templateUrl: './cascade-bottom-sheet.component.html',
    styleUrls: ['./cascade-bottom-sheet.component.scss']
})
export class NmCascadeBottomSheetComponent {

    selected = new FormControl(0);
    labels = [];

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public root: any,
    ) {
        this.root.steps.forEach((items: Array<OptionsInterface>) => {
            const steps: Array<OptionsInterface> = items.filter((item: OptionsInterface) => item.active);
            !!steps[0] && this.labels.push(steps[0].label);
        });
    }

    clickHandle(event: Event): void {
        event.stopPropagation();
    }

    select(label) {
        this.labels[this.selected.value] = label;
        this.labels = this.labels.slice(0, this.selected.value + 1);
        this.selected.setValue(this.root.steps.length - 1);
    }

}
