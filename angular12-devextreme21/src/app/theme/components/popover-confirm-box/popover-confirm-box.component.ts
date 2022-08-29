import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxPopoverComponent} from 'devextreme-angular';

@Component({
    selector: 'app-popover-confirm-box',
    templateUrl: './popover-confirm-box.component.html',
    styleUrls: ['./popover-confirm-box.component.scss']
})
export class PopoverConfirmBoxComponent implements OnInit {
    @ViewChild('popover', {static: true}) popover: DxPopoverComponent;

    @Input() title: string;
    @Input() message: string;
    @Input() yesButtonType: 'danger' | 'default' = 'default';
    @Input() position: string = 'bottom';
    @Input() width: 'auto' | number = 'auto';

    @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    private data: any;

    constructor() {
    }

    ngOnInit() {
    }

    confirm() {
        this.popover.instance.hide();
        this.onConfirm.emit(this.data);
    }

    cancel() {
        this.popover.instance.hide();
        this.onCancel.emit(this.data);
    }

    onHidden() {
        this.onHide.emit(this.data);
    }

    hide() {
        this.popover.instance.hide();
    }

    show(target: any = null, data: any = null) {
        if (this.popover) {
            this.popover.instance.show(target);
        }
        this.data = data;
    }

    option(name: string) {
        return this.popover.instance.option(name);
    }
}
