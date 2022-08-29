import {APP_INITIALIZER} from '@angular/core';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {AuthService} from '@app/shared/services';
import {AppStorage} from '@app/utilities';
import {JwtHelperService} from '@auth0/angular-jwt';

export function appInitializer(authService: AuthService, jwtService: JwtHelperService) {
  return () => {
    return new Promise((resolve, reject) => {
      if (!!jwtService.tokenGetter()) {
        if (jwtService.isTokenExpired()) {
          return authService.refreshToken()
            .subscribe((user) => {
              AppStorage.storeData(ACCESS_TOKEN_KEY, user.jwtToken);
            })
            .add(resolve);
        } else {
          return authService.getUser().subscribe().add(resolve);
        }
      } else {
        resolve(null);
      }
    });
  };
}

export const appInitializerProvider = [
  {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService, JwtHelperService]}
];
