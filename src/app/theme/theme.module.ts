import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  DxButtonModule, DxContextMenuModule,
  DxDrawerModule, DxFormModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPopoverModule, DxPopupModule,
  DxScrollViewModule,
  DxToolbarModule,
  DxTreeViewModule
} from 'devextreme-angular';
import {
  FooterComponent,
  HeaderComponent,
  PopoverConfirmBoxComponent, PopoverTitleComponent, PopupContainerComponent,
  SideNavigationMenuComponent,
  UserPanelComponent
} from './components';
import {AutoFocusInputDirective} from './directives';
import {
  NotAuthorizedContainerComponent,
  SideNavInnerToolbarComponent,
  SideNavOuterToolbarComponent,
  SingleCardComponent, UnauthenticatedContentComponent
} from './layouts';


const DEVEXTREME_MODULES = [
  DxToolbarModule,
  DxButtonModule,
  DxTreeViewModule,
  DxDrawerModule,
  DxScrollViewModule,
  DxFormModule,
  DxLoadIndicatorModule
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
  PopoverTitleComponent
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
