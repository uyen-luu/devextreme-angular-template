import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {UserState} from '@app/store/states/user.state';
import {ThemeModule} from '@app/theme/theme.module';
import {
  appInitializerProvider,
  fakeBackendProvider,
  noopInterceptorProvider
} from '@app/utilities/http-interceptors';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {SharedModule} from '@app/shared/shared.module';
import {AppStorage} from '@app/utilities';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '@environment';
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule} from '@ngxs/store';

//
export function accessTokenGetter() {
  return AppStorage.getTokenData(ACCESS_TOKEN_KEY);
}

//
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    ThemeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: accessTokenGetter,
        disallowedRoutes: [
          new RegExp('\/assets\/.*'),
          new RegExp('\/login-form\/.*')
        ]
      }
    }),
    NgxsModule.forRoot([UserState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot()
  ],
  providers: [
    appInitializerProvider,
    noopInterceptorProvider,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
