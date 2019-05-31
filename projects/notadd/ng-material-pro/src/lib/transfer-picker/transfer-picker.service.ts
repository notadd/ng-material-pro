import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { SourceOptions, TransferFilterData, TransferFilterItem, TransferItemNode } from './interface';

@Injectable()
export class NmTransferPickerService {

    dataSourceChange: BehaviorSubject<Array<TransferItemNode>>;
    filtersChange: BehaviorSubject<Array<TransferFilterItem>>;
    sourceOptionsChange: BehaviorSubject<SourceOptions>;
    selectedValuesChange: BehaviorSubject<Array<string>>;

    private _dataSource: Array<TransferItemNode>;

    private filterData: TransferFilterData;
    private keyword: string;
    private originalDataSource: Array<TransferItemNode>;
    private filteredDataSource: Array<TransferItemNode>;
    private compareMap: Map<string, (a: any, b: any) => boolean>;
    private conditionMap: Map<string, (arr: Array<boolean>) => boolean>;

    get dataSource(): Array<TransferItemNode> {
        return this._dataSource;
    }

    set dataSource(data: Array<TransferItemNode>) {
        this._dataSource = data;

        if (!this.originalDataSource) {
            this.originalDataSource = JSON.parse(JSON.stringify(data));
        }

        this.dataSourceChange.next(data);
    }

    set sourceOptions(value: SourceOptions) {
        this.sourceOptionsChange.next(value);
    }

    set selectedValues(value: Array<string>) {
        this.selectedValuesChange.next(value);
    }

    constructor() {
        this.dataSourceChange = new BehaviorSubject<Array<TransferItemNode>>([]);
        this.filtersChange = new BehaviorSubject<Array<TransferFilterItem>>([]);
        this.sourceOptionsChange = new BehaviorSubject<SourceOptions>(void (0));
        this.selectedValuesChange = new BehaviorSubject<Array<string>>([]);

        this.compareMap = new Map<string, (a: any, b: any) => boolean>([
            ['0', (a, b) => a === b],
            ['1', (a, b) => a !== b],
            ['2', (a, b) => a > b],
            ['3', (a, b) => a < b],
            ['0,2', (a, b) => a >= b],
            ['0,2', (a, b) => a <= b]
        ]);

        this.conditionMap = new Map<string, (arr: Array<boolean>) => boolean>([
            ['or', (arr) => arr.reduce((o, item) => (o.result = o.result || item || o.prev, o.prev = item, o), { result: false, prev: arr[0] }).result],
            ['and', (arr) => arr.reduce((o, item) => (o.result = o.result && item && o.prev, o.prev = item, o), { result: true, prev: arr[0] }).result],
        ]);
    }

    filterDataSource({filterData, keyword}: {filterData?: TransferFilterData, keyword?: string}) {
        this.filterData = filterData || this.filterData;
        this.keyword = keyword === void (0) ? this.keyword : keyword;

        /* 按条件过滤 */
        if (filterData && filterData.filters.length) {
            /* 是否用关键字过滤过确定数据源 按条件过滤 */
            this.filterDataSourceByType(this.keyword ? this.filteredDataSource : this.originalDataSource, 'Filters');
            return;
        }
        /* 清空条件 */
        else if (filterData && !filterData.filters.length) {
            /* 是否用关键字过滤过 */
            if (this.keyword) {
                this.filterDataSourceByType(this.originalDataSource, 'Keyword');
            } else {
                this.resetDataSource();
            }
            return;
        }

        /* 按关键字过滤 */
        if (keyword) {
            /* 是否用条件过滤过确定数据源 */
            this.filterDataSourceByType(this.filterData && this.filterData.filters.length ? this.filteredDataSource : this.originalDataSource, 'Keyword');
            return;
        }
        /* 清空关键字 */
        else if (!keyword) {
            /* 是否用条件过滤过 */
            if (this.filterData && this.filterData.filters.length) {
                this.filterDataSourceByType(this.originalDataSource, 'Filters');
            } else {
                this.resetDataSource();
            }
            return;
        }
    }

    resetDataSource() {
        this.dataSource = this.originalDataSource;
        this.filteredDataSource = [];
    }

    private filterDataSourceByType(dataSource: Array<TransferItemNode>, type: 'Filters' | 'Keyword') {
        this.filteredDataSource = [];
        /* 按 `type` 过滤 */
        this[`setFilteredDataSourceBy${type}`](dataSource);
        this.dataSource = this.filteredDataSource;
        return;
    }

    private setFilteredDataSourceByFilters(dataSource: Array<TransferItemNode>) {
        dataSource.map(data => {
            const compareResultArr = [];
            /* 匹配过滤 */
            this.filterData.filters.map(filter => {
                if (data.hasOwnProperty(filter.field)) {
                    const compare = this.compareMap.get(filter.condition.sort().toString())(filter.value, data[filter.field]);

                    if (this.filterData.filters.length < 2 && compare) {
                        this.filteredDataSource.push(data);
                    } else {
                        compareResultArr.push(compare);
                    }
                }
            });

            /* 条件 */
            if (compareResultArr.length && this.conditionMap.get(this.filterData.condition)(compareResultArr)) {
                this.filteredDataSource.push(data);
            }

            if (data.children && data.children.length > 0) {
                this.setFilteredDataSourceByFilters(data.children);
            }

        });
    }

    private setFilteredDataSourceByKeyword(dataSource: Array<TransferItemNode>) {

        dataSource.map(data => {
            if (data.label.includes(this.keyword)) {
                this.filteredDataSource.push(data);
            } else if (data.children && data.children.length > 0) {
                this.setFilteredDataSourceByKeyword(data.children);
            }
        });
    }

}
