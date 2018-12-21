import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule } from '@angular/material';

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
