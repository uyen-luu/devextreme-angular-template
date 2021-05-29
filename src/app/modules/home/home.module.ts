import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthGuardService} from '../../shared/services';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';

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
