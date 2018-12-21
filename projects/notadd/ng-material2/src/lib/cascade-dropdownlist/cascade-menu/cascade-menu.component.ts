import { Component, OnInit, Optional } from '@angular/core';
import { DropAnimation } from '../drop.animation';

import { NmCascadeListComponent } from '../cascade-list/cascade-list.component';

@Component({
    selector: 'nm-cascade-menu',
    templateUrl: './cascade-menu.component.html',
    styleUrls: ['./cascade-menu.component.scss'],
    animations: [DropAnimation],
})
export class NmCascadeMenuComponent {

    constructor(
        @Optional() public root: NmCascadeListComponent,
    ) {
    }

    clickHandle(event: Event): void {
        event.stopPropagation();
    }

}
