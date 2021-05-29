import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {DxDataGridModule} from 'devextreme-angular';
import {AuthGuardService} from '../../shared/services';
import {SharedModule} from '../../shared/shared.module';
import {ThemeModule} from '../../theme/theme.module';
import {TasksComponent} from './tasks.component';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TasksComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ]
})
export class TasksModule { }

