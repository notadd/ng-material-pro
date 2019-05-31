import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule, NmTransferPickerModule } from '../../projects/notadd/ng-material-pro/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        FlexLayoutModule,

        MatIconModule,
        MatListModule,
        MatButtonModule,

        NmAlertModule,
        NmCarouselModule,
        NmCascadeDropdownlistModule,
        NmTransferPickerModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
