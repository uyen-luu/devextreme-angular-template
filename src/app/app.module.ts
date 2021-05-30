import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {NoopInterceptor} from '@app/utilities/http-interceptors';
import {AuthService} from '@app/services';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {SharedModule} from '@app/shared/shared.module';
import {ThemeModule} from '@app/theme/theme.module';
import {AppStorage} from '@app/utilities';
import {appInitializer} from '@app/utilities/http-interceptors/app.initializer';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
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
          new RegExp('\/login\/.*')
        ],
        skipWhenExpired: true,
        throwNoTokenError: true
      }
    })
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService, JwtHelperService]},
    {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
