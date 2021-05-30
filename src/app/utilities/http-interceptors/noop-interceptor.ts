import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {AuthService} from '@app/services';
import {JwtHelperService} from '@auth0/angular-jwt';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppNotify} from '../index';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtHelperService, private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // TODO Add header if needed

    if (this.jwtService.isTokenExpired()){

    }
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if ([401, 403].includes(error.status) && this.authService.loggedIn) {
            // auto logout if 401 or 403 response returned from api
            this.authService.logOut();
          }
          // TODO Handle error
          AppNotify.error('Application Error');
          return throwError(error.message);
        }));
  }
}
