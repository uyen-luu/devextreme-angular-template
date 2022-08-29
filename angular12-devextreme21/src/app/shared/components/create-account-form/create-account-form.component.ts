import { Component} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '@app/shared/services';
import {AppNotify} from '@app/utilities';
import {finalize} from 'rxjs/operators';
//
@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    this.authService.createAccount(email, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        AppNotify.error(error)
      });
  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.formData.password;
  }
}
