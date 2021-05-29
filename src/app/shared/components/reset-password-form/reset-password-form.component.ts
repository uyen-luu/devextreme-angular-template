import { Component} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '@app/services';
import notify from 'devextreme/ui/notify';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']);
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }
}
