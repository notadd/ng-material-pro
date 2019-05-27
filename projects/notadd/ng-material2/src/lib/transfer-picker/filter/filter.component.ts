import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { TransferFilterData, TransferFilterItem } from '../interface';
import { NmTransferPickerService } from '../transfer-picker.service';

@Component({
    selector: 'nm-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NmFilterComponent implements OnInit {

    @ViewChild(CdkOverlayOrigin, { static: true }) overlayOrigin: CdkOverlayOrigin;
    @ViewChild('filterTemplate', { static: true }) filterTemplate: TemplatePortalDirective;
    overlayRef: OverlayRef;

    @Input()
    filters: Array<TransferFilterItem>;

    filterData: TransferFilterData;

    constructor(
        private overlay: Overlay,
        private service: NmTransferPickerService
    ) {
        this.filterData = {
            condition: 'or',
            filters: []
        };
    }

    ngOnInit() {
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        config.positionStrategy = this.overlay
            .position()
            .connectedTo(
                this.overlayOrigin.elementRef,
                { originX: 'end', originY: 'bottom' },
                { overlayX: 'end', overlayY: 'top' }
            )
            .withOffsetX(5);

        this.overlayRef = this.overlay.create(config);

        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach();
        });
    }

    toggleFilter() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        } else {
            this.overlayRef.attach(this.filterTemplate);
        }
    }

    onFilterClick(filter) {
        filter.selected = !filter.selected;

        const existFilter = this.filterData.filters.find(item => item.value === filter.value);

        if (!existFilter) {
            this.filterData.filters.push(filter);
        } else if (!filter.selected) {
            this.filterData.filters.splice(this.filterData.filters.indexOf(filter), 1);
        }

        this.changeFilterData();
    }

    onConditionChange(event) {
        this.filterData.condition = event;

        this.changeFilterData();
    }

    changeFilterData() {
        this.service.filterDataSource({filterData: this.filterData});
    }

}
