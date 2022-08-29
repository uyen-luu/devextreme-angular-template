import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {AppStorage, EC, JWK, JWT} from '@app/utilities';
import {UserModel} from '@app/shared/models';
import {AuthService} from '@app/shared/services';
import {JwtHelperService} from '@auth0/angular-jwt';
import {from, Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize, map} from 'rxjs/operators';

// array in local storage for users
const usersKey = 'angular-jwt-refresh-token-users';
let users = JSON.parse(AppStorage.getData(usersKey)) || [];

// add test user and save if users array is empty
if (!users.length) {
  users.push({
    id: 1,
    firstName: 'Uyen',
    lastName: 'Luu',
    username: 'it.luudinhuyen@gmail.com',
    password: '123456',
    refreshTokens: [],
    avatarUrl: 'assets/images/avatar.jpg'
  });
  AppStorage.storeData(usersKey, JSON.stringify(users));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private jwtService: JwtHelperService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;
    const isLoggedIn = () => {
      return !this.jwtService.isTokenExpired();
    };

    const currentToken = () => {
      return this.jwtService.tokenGetter();
    };

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute(): Observable<any> {
      switch (true) {
        case url.endsWith('user/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('user/refresh-token') && method === 'POST':
          return refreshToken();
        case url.endsWith('user/revoke-token') && method === 'POST':
          return revokeToken();
        case url.endsWith('user') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const {username, password} = body;
      getStoredUsers();
      const user = users.find(x => x.username === username && x.password === password);

      if (!user) return error('Username or password is incorrect');

      // add refresh token to user
      user.refreshTokens.push(generateRefreshToken());
      AppStorage.storeData(usersKey, JSON.stringify(users));

      return from(generateJwtToken(user)).pipe(map(jwtToken => {
        const body = new UserModel({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          jwtToken
        });
        return new HttpResponse({status: 200, body});
      }));
    }

    function refreshToken() {
      const refreshToken = getRefreshToken();

      if (!refreshToken) return unauthorized();

      getStoredUsers();
      const user = users.find(x => x.refreshTokens.includes(refreshToken));

      if (!user) return unauthorized();

      // replace old refresh token with a new one and save
      user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
      user.refreshTokens.push(generateRefreshToken());
      AppStorage.storeData(usersKey, JSON.stringify(users));

      return from(generateJwtToken(user)).pipe(map(jwtToken => {
        const body = new UserModel({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          jwtToken
        });
        return new HttpResponse({status: 200, body});
      }));
    }

    function revokeToken() {
      if (!isLoggedIn()) return unauthorized();

      const refreshToken = getRefreshToken();
      getStoredUsers();
      const user = users.find(x => x.refreshTokens.includes(refreshToken));

      // revoke token and save
      user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
      AppStorage.storeData(usersKey, JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      const tokenInfo = JWT.getPayloadData(currentToken());
      const user = users.find(_ => _.id === tokenInfo.sub);
      return ok(user);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorized'}});
    }

    function generateJwtToken(user: UserModel): Promise<string> {
      const claims = {
        iss: 'http://localhost:4200',
        sub: user.id,
        azp: 'appId',
        aud: 'http://localhost:4200',
        exp: Math.round(Date.now() / 1000) + 15 * 60
      };

      return EC.generate().then((jwk) => {
        console.info('Private Key:', JSON.stringify(jwk));
        console.info('Public Key:', JSON.stringify(EC.neuter(jwk)));

        return JWK.thumbprint(jwk).then((kid) => {
          return JWT.sign(jwk, {kid: kid}, claims).then((jwt) => {
            console.info('JWT:', jwt);
            return jwt;
          });
        });
      });
    }

    function generateRefreshToken() {
      const token = new Date().getTime().toString();


      // add token cookie that expires in 7 days
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

      return token;
    }

    function getRefreshToken() {
      // get refresh token from cookie
      return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
    }

    function getStoredUsers() {
      users = JSON.parse(AppStorage.getData(usersKey)) || [];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
  deps: [AuthService, JwtHelperService]
};
