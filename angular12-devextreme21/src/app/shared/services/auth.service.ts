import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {UserModel} from '@app/shared/models';
import {SetLoggedUser} from '@app/store/actions';
import {IUser} from '@app/store/models';
import {UserState} from '@app/store/states/user.state';
import {AppStorage} from '@app/utilities';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '@environment';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';
import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

const defaultPath = '/';

@Injectable({providedIn: 'root'})
export class AuthService {
  @SelectSnapshot(UserState.user) user: IUser;

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store,
    private jwtHelper: JwtHelperService
  ) {
  }


  get loggedIn(): boolean {
    return !!this.user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  logIn(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/user/authenticate`, {
      username,
      password
    }, {withCredentials: true})
      .pipe(map(user => {
        AppStorage.storeData(ACCESS_TOKEN_KEY, user.jwtToken);
        this.store.dispatch(new SetLoggedUser(user));
        this.startRefreshTokenTimer();
        this.router.navigate([this._lastAuthenticatedPath]);
        return user;
      }));
  }

  logOut() {
    this.http.post<any>(`${environment.apiUrl}/user/revoke-token`, {}, {withCredentials: true}).subscribe(() => {
      this.stopRefreshTokenTimer();
      AppStorage.storeData(ACCESS_TOKEN_KEY, '');
      this.store.dispatch(new SetLoggedUser(null));
      this.router.navigate(['/login']);
    });
  }

  refreshToken(): Observable<UserModel> {
    if (!environment.production) {
      console.log('refreshToken');
    }
    return this.http.post<any>(`${environment.apiUrl}/user/refresh-token`, {}, {withCredentials: true})
      .pipe(map((user) => {
        this.store.dispatch(new SetLoggedUser(user));
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiUrl}/user`).pipe(map((user) => {
      this.store.dispatch(new SetLoggedUser(user));
      return user;
    }));
  }

  resetPassword(email: string) {
    return of();
  }

  createAccount(email: string, password: string) {
    return of();
  }

  changePassword(password: string, recoveryCode) {
    return of();
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // set a timeout to refresh the token a minute before it expires
    const expires = this.jwtHelper.getTokenExpirationDate();
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
