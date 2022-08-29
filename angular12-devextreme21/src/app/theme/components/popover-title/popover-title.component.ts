import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-popover-title',
    templateUrl: './popover-title.component.html',
    styleUrls: ['./popover-title.component.scss']
})
export class PopoverTitleComponent implements OnInit {
    @Input() title: string;

    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    isVisible: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    closePopover() {
        this.onClose.emit(true);
    }
}
