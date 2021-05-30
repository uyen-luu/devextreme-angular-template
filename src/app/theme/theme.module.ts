import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  DxButtonModule, DxContextMenuModule, DxDataGridModule,
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
import { ErrorComponent } from './components/error/error.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


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
