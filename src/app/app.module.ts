import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NmAlertModule, NmCarouselModule } from '../../projects/notadd/ng-material2/src/public_api';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        NmAlertModule,
        NmCarouselModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
