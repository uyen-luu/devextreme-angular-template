import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {AuthService} from '@app/shared/services';
import {AppNotify} from '@app/utilities';
import {JwtHelperService} from '@auth0/angular-jwt';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private jwtService: JwtHelperService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if ([401, 403].includes(error.status) && this.authService.loggedIn) {
            // auto logout if 401 or 403 response returned from api
            this.authService.logOut();
          }
          // TODO Handle error
          error = error?.error || error;
          AppNotify.error(error?.message || 'Application Error');
          return throwError(error);
        }));
  }
}

export const noopInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true, deps: [AuthService, JwtHelperService]}
];
