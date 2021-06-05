import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {metaReducers, reducers} from '@app/store/reducers';
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
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

//
export function accessTokenGetter() {
  const token = AppStorage.getTokenData(ACCESS_TOKEN_KEY);
  return token;
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
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
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
