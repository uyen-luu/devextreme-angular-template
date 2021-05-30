import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(private authenticationService: AuthService) {
  }

  ngOnInit() {
  }

  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    this.authenticationService.logOut();
  }
}
