import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { NmAlertComponent } from './alert.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        NmAlertComponent
    ],
    exports: [
        NmAlertComponent
    ]
})
export class NmAlertModule {
}
