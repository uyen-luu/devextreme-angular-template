import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from '@app/services';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from '@app/shared/components';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
