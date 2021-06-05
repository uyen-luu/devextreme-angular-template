import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {AuthService} from '@app/services';

import { Router } from '@angular/router';
import {UserModel} from '@app/shared/models';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  user: UserModel = new UserModel();

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user.subscribe( user => {
      this.user = user;
    });
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}
