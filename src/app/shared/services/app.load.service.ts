import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@app/shared/services/auth.service';
import {AppNotify} from '@app/utilities';
import {forkJoin, of} from 'rxjs';

@Injectable()
export class AppLoadService {
  protected httpClient: HttpClient;
  protected authService: AuthService;

  constructor(private injector: Injector) {
    this.httpClient = this.injector.get(HttpClient);
    this.authService = this.injector.get(AuthService);
  }

  initApp(): Promise<any> {
    //
    // TODO: Init webWorker here

    //
    if (this.authService.loggedIn) {
      // forkJoin to require all requests to complete
      const result = forkJoin({
        // lookup: this.loadAppLookup()
        user: this.loadUser()
      }).toPromise().then((response) => {
        // Handle here if needed
      }, (error) => {
        AppNotify.error();
        this.authService.logOut();
      });
      return result;
    } else {
      return of(true).toPromise();
    }

    return of(true).toPromise();
  }

  loadUser(): Promise<any> {
    // return this.authService.getUser().toPromise().then((user) => {
    //   this.authService.setCurrentUser(user);
    //   //
    //   return user;
    // });

    return of(true).toPromise();
  }
}
