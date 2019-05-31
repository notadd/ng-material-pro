export interface OptionsInterface {
    label?: string;
    value: string;
    children?: Array<OptionsInterface>;
    disabled?: boolean;
    active?: boolean;
    [propName: string]: any;
}
