import { Component, forwardRef, OnDestroy, OnInit, OnChanges, SimpleChanges, Renderer2, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OptionsInterface } from '../options.interface';

let NEXT_ID = 0;

@Component({
    selector: 'nm-cascade-dropdownlist',
    templateUrl: './cascade-list.component.html',
    styleUrls: ['./cascade-list.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NmCascadeListComponent),
        multi: true
    }],
})
export class NmCascadeListComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {

    /* 组件 id */
    @HostBinding('attr.id')
    @Input()
    public id = `nm-cascade-list-${NEXT_ID++}`;

    @Input() disabled = false;

    @Input() placeholder = '请选择';

    // data
    @Input() options: Array<OptionsInterface>;
    @Input() clearable = false;
    @Input() fullLevels = true;
    @Input() changeOnSelect = false;

    // bind value
    @Input() model: Array<string>;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

    steps: Array<any> = [];
    menuVisible = false;
    inputHover = false;
    currentLabels: Array<OptionsInterface> = [];
    globalListenFunc: Function;
    inputValue: string;

    constructor(
        private renderer: Renderer2,
    ) {
    }

    private controlChange: Function = () => { };
    private controlTouch: Function = () => { };

    private setInputValue() {
        if (this.fullLevels) {
            this.currentLabels.map((value, i) => {
                this.inputValue += `${value.label}${i < this.currentLabels.length - 1 ? ' / ' : ''}`;
            });
        } else {
            this.inputValue = this.currentLabels[this.currentLabels.length - 1].label;
        }
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.options) {
            this.options = changes.options.currentValue;
            this.init();
        }
    }

    init(): void {
        this.clearValue();

        if (this.model && this.model.length) {
            const getLabel = (options: Array<OptionsInterface>, val: string) => {
                const item: OptionsInterface = options.filter((item: OptionsInterface) => item.value === val)[0];
                return { children: item.children, val: item };
            };

            let options: Array<OptionsInterface> = this.options;
            const val: Array<OptionsInterface> = this.model.map(v => {
                const { children, val } = getLabel(options, v);
                options = children;
                return val;
            });

            this.currentLabels = val.filter(v => !!v);
            this.setInputValue();
            this.initSteps(0, this.options);
        }
    }

    writeValue(value: any): void {
        this.model = value;
    }

    registerOnChange(fn: Function): void {
        this.controlChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.controlTouch = fn;
    }

    close(): void {
        this.menuVisible = false;
        this.globalListenFunc && this.globalListenFunc();
    }

    clickHandle(event: MouseEvent): void {
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        const element: HTMLElement = event.target as HTMLElement;
        const isSelfTrigger = ['SPAN', 'I', 'INPUT'].find(v => v === element.tagName);
        if (!isSelfTrigger) {
            return;
        }
        this.menuVisible = !this.menuVisible;

        if (this.menuVisible) {
            this.globalListenFunc = this.renderer.listen(
                'document', 'click', () => {
                    this.menuVisible = false;
                }
            );
        } else {
            this.globalListenFunc && this.globalListenFunc();
        }
    }

    changeLabels(): void {
        this.inputValue = '';
        const nextValue: Array<OptionsInterface> = [];

        this.steps.forEach((items: Array<OptionsInterface>) => {
            const steps: Array<OptionsInterface> = items.filter((item: OptionsInterface) => item.active);
            nextValue.push(steps[0]);
        });
        this.currentLabels = nextValue;
        this.setInputValue();
        const next = nextValue.map((item: OptionsInterface) => item.value);
        this.model = next;
        this.modelChange.emit(next);
        this.controlChange(next);
    }

    clearValue(event?: Event): void {
        event && event.stopPropagation();
        this.currentLabels = [];
        if ((this.model && !this.model.length) || !this.model) {
            const step1 = this.options.map((option: OptionsInterface) => ({
                ...option,
                active: false
            }));
            this.steps = [step1];
        }

        this.menuVisible = false;
        this.inputValue = '';

        event && this.modelChange.emit([]);
    }

    initSteps(index, options) {
        const step = [];
        options.map((item: OptionsInterface) => {
            if (this.model[index] === item.value) {
                options = item.children;
                step.push(({
                    ...item,
                    active: true
                }));
            } else {
                step.push(item);
            }
        });
        this.steps.push(step);
        index += 1;
        index < this.model.length && this.initSteps(index, options);
    }

    selectHandle(event: Event, step: number, index: number): any {
        event.stopPropagation();

        if (this.steps[step][index].disabled) {
            return;
        }

        this.steps[step] = this.steps[step].map((item: OptionsInterface, i: number) =>
            ({
                ...item,
                active: i === index
            }));
        // reset steps
        this.steps.length = step + 1;
        const next = this.steps[step][index].children;

        // go next
        if (next && Array.isArray(next) && next.length) {
            // change on select (props)
            this.changeOnSelect && this.changeLabels();
            const nativeNext = next.map((item: OptionsInterface) => ({
                ...item,
                active: false
            }));
            return this.steps.push(nativeNext);
        }

        // last step
        this.changeLabels();
        this.menuVisible = false;
    }

    showClearIcon(): boolean {
        return !!(this.clearable && this.inputHover && this.currentLabels.length);
    }

    ngOnDestroy(): void {
        this.globalListenFunc && this.globalListenFunc();
    }
}
