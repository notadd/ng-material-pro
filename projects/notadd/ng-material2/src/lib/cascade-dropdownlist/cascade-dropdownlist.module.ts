import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatBottomSheetModule, MatTabsModule } from '@angular/material';

import { NmCascadeListComponent } from './cascade-list/cascade-list.component';
import { NmCascadeMenuComponent } from './cascade-menu/cascade-menu.component';
import { NmCascadeBottomSheetComponent } from './cascade-bottom-sheet/cascade-bottom-sheet.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatBottomSheetModule,
        MatTabsModule
    ],
    declarations: [
        NmCascadeListComponent,
        NmCascadeMenuComponent,
        NmCascadeBottomSheetComponent
    ],
    exports: [
        NmCascadeListComponent,
        NmCascadeMenuComponent,
        NmCascadeBottomSheetComponent
    ],
    entryComponents: [
        NmCascadeListComponent,
        NmCascadeBottomSheetComponent
    ]
})
export class NmCascadeDropdownlistModule {
}
