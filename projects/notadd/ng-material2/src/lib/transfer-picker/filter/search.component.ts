import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of as ofObservable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NmTransferPickerService } from '../transfer-picker.service';

@Component({
    selector: 'nm-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class NmSearchComponent implements OnInit {

    @Input()
    searchPlaceholder: string;

    keyword: FormControl;
    constructor(
        private service: NmTransferPickerService
    ) {
        this.keyword = new FormControl();
    }

    ngOnInit() {
        this.keyword
            .valueChanges
            .pipe(
                debounceTime(200),
                distinctUntilChanged()
            )
            .subscribe(keyword => this.service.filterDataSource({ keyword }));
    }

    reset () {
        this.keyword.setValue('');
    }
}
