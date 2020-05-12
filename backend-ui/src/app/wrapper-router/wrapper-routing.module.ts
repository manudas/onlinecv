import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { DashboardModule } from '@app/dashboard/dashboard.module';
import { DetailsModule } from '@app/details/details.module';
import { TrainingModule } from '@app/training/training.module';

import { routes } from './config/routes'

@NgModule({
  imports: [
    DashboardModule,
    DetailsModule,
    TrainingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
