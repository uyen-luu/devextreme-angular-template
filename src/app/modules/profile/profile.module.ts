import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from '@app/modules/profile/profile.component';
import {SharedModule} from '@app/modules/shared';
import {ThemeModule} from '@app/modules/theme';
import {AuthGuardService} from '@app/shared/services';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ]
})
export class ProfileModule { }
