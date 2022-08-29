import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@app/shared/services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn;
    this.toggleHeader(false);
  }

  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    this.authService.logOut();
  }

  private toggleHeader(isShow: boolean) {
    const header = document.getElementsByClassName('header') as HTMLCollection;
    if (!!header.length) {
      if (isShow) {
        header[0].classList.remove('d-none');
      } else {
        header[0].classList.add('d-none');
      }
    }

  }

  ngOnDestroy(): void {
    this.toggleHeader(true);
  }
}
