import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../../shared/services';
import {SharedModule} from '../../shared/shared.module';
import {ThemeModule} from '../../theme/theme.module';
import {ProfileComponent} from './profile.component';

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
