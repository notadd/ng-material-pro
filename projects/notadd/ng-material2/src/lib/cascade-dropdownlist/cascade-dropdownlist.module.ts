import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";

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
