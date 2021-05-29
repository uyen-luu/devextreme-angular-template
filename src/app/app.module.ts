import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {AppLoadService} from '@app/services';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {SharedModule} from '@app/shared/shared.module';
import {ThemeModule} from '@app/theme/theme.module';

export function initializeApp(injector: Injector) {
  return (): Promise<any> => {
    const appInitService = injector.get(AppLoadService);
    return appInitService.initApp();
  };
}

export function accessTokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ? decodeURIComponent(
    atob(localStorage.getItem(ACCESS_TOKEN_KEY))
  ) : null;
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
    ThemeModule
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
export class AppModule { }
