import {
    Component, EventEmitter, HostListener, Input,
    OnInit, Output, TemplateRef, ViewChild
} from '@angular/core';
import {DxPopupComponent, DxScrollViewComponent} from 'devextreme-angular';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-popup-container',
    templateUrl: './popup-container.component.html',
    styleUrls: ['./popup-container.component.scss']
})
export class PopupContainerComponent implements OnInit {
    @ViewChild('popup', {static: false}) popup: DxPopupComponent;
    @ViewChild('scrollView', {static: false}) scrollView: DxScrollViewComponent;

    private _visible: boolean = false;
    private _width: number | string = 'auto';
    private _height: number | string = 'auto';
    private _title: string;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }

    @Input()
    get width(): number | string {
        return this._width;
    }

    set width(value: number | string) {
        this._width = value;
        this.widthChange.emit(value);
    }

    @Input()
    get height(): number | string {
        return this._height;
    }

    set height(value: number | string) {
        this._height = value;
        this.heightChange.emit(value);
    }

    @Input()
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this.titleChange.emit(value);
    }

    @Input() fullScreenOnMobile: boolean = true;
    @Input() fullScreenOnTablet: boolean = false;
    @Input() fullScreen: boolean = false;
    @Input() autoFullScreenOnOverflow: boolean = true;
    @Input() showCloseButton: boolean = true;
    @Input() shading: boolean = true;
    @Input() dragEnabled: boolean = false;

    @Input() footerTemplate: TemplateRef<any>;
    @Input() headerTemplate: TemplateRef<any>;

    @Output() visibleChange = new EventEmitter();
    @Output() widthChange = new EventEmitter();
    @Output() heightChange = new EventEmitter();
    @Output() titleChange = new EventEmitter();
    @Output() onHiding = new EventEmitter();

    private get isAutoHeight(): boolean {
        return this.height === 'auto';
    }

    isFullScreenPopup: boolean = false;
    autoContentContainerHeight: boolean = true;
    isRendering: boolean = true;

    constructor(private deviceService: DeviceDetectorService) {
    }

    ngOnInit() {
        this.popupInit();
    }

    popupInit() {
        if (this.height !== 'auto') {
            this.autoContentContainerHeight = false;
        }

        if (this.fullScreen) {
            this.isFullScreenPopup = true;
        } else if (!this.fullScreen && this.fullScreenOnTablet) {
            this.isFullScreenPopup = this.deviceService.isTablet();
        } else if (!this.fullScreenOnTablet && this.fullScreenOnMobile) {
            this.isFullScreenPopup = this.deviceService.isMobile();
        }

        /**
         * Auto Fullscreen in case width/maxWidth greater than the window
         */
        if (this.autoFullScreenOnOverflow) {
            // TODO: Check this
            if (this.width !== 'auto' && this.width >= window.innerWidth) {
                this.isFullScreenPopup = true;
            }
        }
    }

    @HostListener('window:resize')
    onResize() {
        if (this.popup !== undefined && this.popup.instance) {
            this.popupInit();
            this.popup.instance.repaint();
            (this.popup.instance as any).refreshPosition();
        }
        if (this.scrollView !== undefined && this.scrollView.instance) {
            this.scrollView.instance.update();
        }
    }

    setVisibility(component: any, value: string) {
        const popupContent = component.content();
        if (!popupContent || !popupContent.parentNode) {
            return;
        }
        popupContent.parentNode.parentNode.style.visibility = value;
        setTimeout(() => {
            this.isRendering = value === 'hidden';
        }, 100);
    }

    refreshPopupUI() {
        //
        // Repaint popup
        if (this.popup && this.popup.instance) {
            this.popup.instance.repaint();
            //
            // Refresh position for auto height popup
            if (this.isAutoHeight) {
                (this.popup.instance as any).refreshPosition();
            }
        }
        //
        // Update scroll view height
        if (this.scrollView && this.scrollView.instance) {
            this.scrollView.instance.update();
        }
    }

    onPopupShowing(e) {
        if (!e || !e.component) {
            return;
        }
        if (this.isAutoHeight) {
            this.setVisibility(e.component, 'hidden');
        }
    }

    onPopupShowed(e) {
        if (!e || !e.component) {
            return;
        }
        this.refreshPopupUI();
        if (this.isAutoHeight) {
            this.setVisibility(e.component, 'unset');
        }
    }

    onPopupHidden(e) {
        this.visible = false;
    }

    onPopupHiding(e) {
        this.onHiding.emit();
    }
}
