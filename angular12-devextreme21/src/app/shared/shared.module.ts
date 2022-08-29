import {ModuleWithProviders, NgModule} from '@angular/core';
import {ThemeModule} from '@app/modules/theme';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './components';
import {AppInfoService, AuthService, ScreenService} from './services';


const PROVIDERS = [
  AppInfoService,
  AuthService,
  ScreenService
];

const COMPONENTS = [
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
];


@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...PROVIDERS]
    } as ModuleWithProviders<SharedModule>;
  }
}
