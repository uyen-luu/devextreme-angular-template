import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from '@app/modules/home/home.component';
import {SharedModule} from '@app/modules/shared';
import {AuthGuardService} from '@app/shared/services';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ]
})
export class HomeModule { }
