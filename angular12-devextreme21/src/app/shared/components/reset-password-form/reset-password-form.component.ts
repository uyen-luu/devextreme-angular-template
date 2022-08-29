import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@app/shared/services';
import {AppNotify} from '@app/utilities';
import {finalize} from 'rxjs/operators';
//
const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

//
@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSubmit(e) {
    e.preventDefault();
    const {email} = this.formData;
    this.loading = true;

    await this.authService.resetPassword(email)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => {
        this.router.navigate(['/login']);
        AppNotify.success(notificationText);
      }, error => {
        AppNotify.error(error);
      });
  }
}
