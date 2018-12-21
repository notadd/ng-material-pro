import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material';

import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule } from '../../projects/notadd/ng-material2/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        MatIconModule,

        NmAlertModule,
        NmCarouselModule,
        NmCascadeDropdownlistModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
