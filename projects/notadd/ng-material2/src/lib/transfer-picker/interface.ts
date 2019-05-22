/**
 * Node for Transfer item
 */
export class TransferItemNode {
    children?: Array<TransferItemNode>;
    label: string;
    value: string | number;
    disabled?: boolean;
    [key: string]: any;
}

/** Flat Transfer item node with expandable and level information */
export class TransferItemFlatNode {
    label: string;
    value: string | number;
    level: number;
    disabled?: boolean;
    expandable: boolean;
}

export enum TransferFilterCondition {
    EQUALS,
    NOT_EQUALS,
    MORE_THAN,
    LESS_THAN
}

export interface TransferFilterItem {
    label: string;
    value: number | string;
    condition: Array<TransferFilterCondition>;
    field: string;
    selected?: boolean;
}

export interface TransferFilterData {
    condition: 'or' | 'and';
    filters: Array<TransferFilterItem>;
}

export interface SourceOptions {
    title: string;
    filterable: boolean;
    searchable: boolean;
    searchPlaceholder: string;
    filters: Array<TransferFilterItem>;
}
