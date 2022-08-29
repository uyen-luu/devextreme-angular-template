import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/shared/services';
import {AppNotify} from '@app/utilities';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode');
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { password } = this.formData;
    this.loading = true;

    this.authService.changePassword(password, this.recoveryCode)
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
