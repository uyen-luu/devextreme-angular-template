import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  ErrorComponent,
  FooterComponent, ForbiddenComponent,
  HeaderComponent,
  PopoverConfirmBoxComponent, PopoverTitleComponent, PopupContainerComponent,
  SideNavigationMenuComponent,
  UserPanelComponent
} from '@app/theme/components';
import {AutoFocusInputDirective} from '@app/theme/directives';
import {
  NotAuthorizedContainerComponent,
  SideNavInnerToolbarComponent,
  SideNavOuterToolbarComponent, SingleCardComponent, UnauthenticatedContentComponent
} from '@app/theme/layouts';
import {
  DxButtonModule, DxContextMenuModule, DxDataGridModule,
  DxDrawerModule, DxFormModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPopoverModule, DxPopupModule,
  DxScrollViewModule,
  DxToolbarModule,
  DxTreeViewModule
} from 'devextreme-angular';;

const DEVEXTREME_MODULES = [
  DxToolbarModule,
  DxButtonModule,
  DxTreeViewModule,
  DxDrawerModule,
  DxScrollViewModule,
  DxFormModule,
  DxLoadIndicatorModule,
  DxDataGridModule
];
//
const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxPopoverModule,
  DxContextMenuModule,
  DxListModule
];

// Components for this module only
const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  SideNavigationMenuComponent,
  NotAuthorizedContainerComponent,
  SideNavOuterToolbarComponent,
  SideNavInnerToolbarComponent,
  SingleCardComponent,
  UnauthenticatedContentComponent,
  UserPanelComponent,
  PopoverConfirmBoxComponent,
  PopupContainerComponent,
  PopoverTitleComponent,
  ErrorComponent,
  ForbiddenComponent
];

//
const DIRECTIVES = [
  AutoFocusInputDirective
];
//
const PIPES = [];

@NgModule({
  imports: [
    ...DEVEXTREME_MODULES,
    ...BASE_MODULES
  ],
  declarations: [
    ...DIRECTIVES,
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...DEVEXTREME_MODULES,
    ...BASE_MODULES,
    ...DIRECTIVES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class ThemeModule {
}
