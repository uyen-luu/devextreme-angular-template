import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/modules/shared';
import {TasksComponent} from '@app/modules/tasks/tasks.component';
import {ThemeModule} from '@app/modules/theme';
import {AuthGuardService} from '@app/shared/services';


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

