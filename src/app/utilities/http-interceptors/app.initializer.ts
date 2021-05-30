import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {AppStorage} from '@app/utilities';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../shared/services';

export function appInitializer(authenticationService: AuthService, jwtService: JwtHelperService) {
  if (jwtService.isTokenExpired()) {
    return () => new Promise(resolve => {
      // attempt to refresh token on app start up to auto authenticate
      authenticationService.refreshToken()
        .subscribe((token) => {
          AppStorage.storeTokenData(ACCESS_TOKEN_KEY, token);
          return authenticationService.getUser();
        })
        .add(resolve);
    });
  } else {
    return authenticationService.getUser();
  }
}
