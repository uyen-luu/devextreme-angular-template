import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {AppLoadService} from '@app/services';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {SharedModule} from '@app/shared/shared.module';
import {ThemeModule} from '@app/theme/theme.module';
import {AppStorage} from '@app/utilities';
import {JwtModule} from '@auth0/angular-jwt';

export function initializeApp(injector: Injector) {
  return (): Promise<any> => {
    const appInitService = injector.get(AppLoadService);
    return appInitService.initApp();
  };
}

export function accessTokenGetter() {
  return AppStorage.getTokenData(ACCESS_TOKEN_KEY);
}

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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
