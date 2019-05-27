import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatTreeModule } from "@angular/material/tree";

import { NmTransferPickerComponent } from './transfer-picker.component';
import { NmTransferPickerSourceComponent } from './transfer-picker-source.component';
import { NmTransferPickerTargetComponent } from './transfer-picker-target.component';
import { NmTransferPickerService } from './transfer-picker.service';
import { NmFilterComponent } from './filter/filter.component';
import { NmSearchComponent } from './filter/search.component';

@NgModule({
    declarations: [
        NmTransferPickerComponent,
        NmTransferPickerSourceComponent,
        NmTransferPickerTargetComponent,
        NmFilterComponent,
        NmSearchComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatIconModule,
        MatTreeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        OverlayModule,
        PortalModule,
        MatButtonToggleModule,
        MatListModule,
        ScrollingModule
    ],
    exports: [NmTransferPickerComponent],
    providers: [NmTransferPickerService]
})
export class NmTransferPickerModule {
}
