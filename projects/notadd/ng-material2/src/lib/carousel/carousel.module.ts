import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { NmCarouselComponent } from './carousel.component';
import { NmSlideComponent } from './slide.component';

@NgModule({
    declarations: [NmCarouselComponent, NmSlideComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [NmCarouselComponent, NmSlideComponent]
})
export class NmCarouselModule {
}
