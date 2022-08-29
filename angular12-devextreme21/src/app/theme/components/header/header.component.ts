import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {AuthService} from '@app/shared/services';

import { Router } from '@angular/router';
import {IUser} from '@app/store/models';
import {UserState} from '@app/store/states/user.state';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @SelectSnapshot(UserState.user) currentUser: IUser;
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

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
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}
