import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { of as ofObservable, Observable, Subject } from 'rxjs';

import { NmTransferPickerService } from './transfer-picker.service';
import { SourceOptions, TransferItemFlatNode, TransferItemNode } from './interface';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
    selector: 'nm-transfer-picker-source',
    templateUrl: './transfer-picker-source.component.html',
    styleUrls: ['./transfer-picker-source.component.scss']
})
export class NmTransferPickerSourceComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output()
    checklistChange: EventEmitter<any>;

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TransferItemNode, TransferItemFlatNode>();

    treeControl: FlatTreeControl<TransferItemFlatNode>;

    treeFlattener: MatTreeFlattener<TransferItemNode, TransferItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TransferItemNode, TransferItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TransferItemFlatNode>(true /* multiple */);

    options: SourceOptions;

    selectedList: Array<TransferItemFlatNode>;

    private ngUnsubscribe: Subject<any>;

    constructor(
        private service: NmTransferPickerService,
    ) {
        this.checklistChange = new EventEmitter<any>();
        this.ngUnsubscribe = new Subject<any>();
    }

    ngOnInit() {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<TransferItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.service
            .dataSourceChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
                this.dataSource.data = data;
                this.checklistSelection.clear();
            });

        this.service
            .selectedValuesChange
            .pipe(
                filter(values => !!values.length),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(values => {
                values.map(value => {
                    this.treeControl.dataNodes.map(node => {
                        if (node.value === value) {
                            this.checklistSelection.select(node);
                        }
                    });
                });
            });

        this.service
            .sourceOptionsChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(options => this.options = options);
    }

    ngAfterViewInit() {
        this.treeControl.expandAll();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    getSelectedList(): Array<TransferItemNode> {
        this.selectedList = this.checklistSelection.selected;
        if (this.selectedList.length) {
            this.selectedList.map(item => {
                /* 禁用 */
                item.disabled = true;

                /* 选中 */
                this.checklistSelection.select(item);
            });

            return this.selectedList;
        }
    }

    resetSelectedItem(item: TransferItemFlatNode) {
        /* 取消禁用 */
        item.disabled = false;

        /* 取消选中 */
        this.checklistSelection.deselect(item);
    }

    private getLevel = (node: TransferItemFlatNode) => node.level;

    private isExpandable = (node: TransferItemFlatNode) => node.expandable;

    private getChildren = (node: TransferItemNode): Observable<Array<TransferItemNode>> => {
        return ofObservable(node.children);
    }

    hasChild = (_: number, _nodeData: TransferItemFlatNode) => _nodeData.expandable;

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    private transformer = (node: TransferItemNode, level: number) => {
        const flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.value === node.value
            ? this.nestedNodeMap.get(node)!
            : new TransferItemFlatNode();
        flatNode.label = node.label;
        flatNode.value = node.value;
        flatNode.disabled = node.disabled;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: TransferItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child => this.checklistSelection.isSelected(child));
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TransferItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the transfer item selection. Select/deselect all the descendants node */
    transferItemSelectionToggle(node: TransferItemFlatNode): void {
        this.checklistSelection.toggle(node);
        let descendants = this.treeControl.getDescendants(node);
        descendants = descendants.filter(node => !node.disabled);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf transfer item selection. Check all the parents to see if they changed */
    transferLeafItemSelectionToggle(node: TransferItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    private checkAllParentsSelection(node: TransferItemFlatNode): void {
        let parent: TransferItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    private checkRootNodeSelection(node: TransferItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    private getParentNode(node: TransferItemFlatNode): TransferItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return void (0);
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return void (0);
    }

}
