import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ACCESS_TOKEN_KEY} from '@app/shared/constant';
import {UserModel} from '@app/shared/models';
import {AppStorage} from '@app/utilities';
import {environment} from '@environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

const defaultPath = '/';

@Injectable({providedIn: 'root'})
export class AuthService {
  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<UserModel>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserModel {
    return this.userSubject.value;
  }

  get loggedIn(): boolean {
    return !!this.userValue;
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
        AppStorage.storeTokenData(ACCESS_TOKEN_KEY, user.jwtToken);
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        this.router.navigate([this._lastAuthenticatedPath]);
        return user;
      }));
  }

  logOut() {
    this.http.post<any>(`${environment.apiUrl}/user/revoke-token`, {}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login-form']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/user/refresh-token`, {}, {withCredentials: true})
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  getUser() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/user`);
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
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
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
      'login-form',
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
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}
