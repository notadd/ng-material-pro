import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatButtonModule } from '@angular/material';

import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule } from '../../projects/notadd/ng-material2/src/public_api';

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
        NmCascadeDropdownlistModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
