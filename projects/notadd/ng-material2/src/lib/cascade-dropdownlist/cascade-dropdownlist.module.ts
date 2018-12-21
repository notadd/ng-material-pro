import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule } from '@angular/material';

import { NmCascadeListComponent } from './cascade-list/cascade-list.component';
import { NmCascadeMenuComponent } from './cascade-menu/cascade-menu.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        NmCascadeListComponent,
        NmCascadeMenuComponent
    ],
    exports: [
        NmCascadeListComponent,
        NmCascadeMenuComponent
    ],
    entryComponents: [NmCascadeListComponent]
})
export class NmCascadeDropdownlistModule {
}
