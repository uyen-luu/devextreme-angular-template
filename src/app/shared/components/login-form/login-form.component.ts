import { Component} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '@app/shared/services';
import {finalize} from 'rxjs/operators';
//
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.formData;

    this.loading = true;
    this.authService.logIn(email, password)
      .pipe(finalize(() => this.loading = false)).subscribe(user => {
    });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
