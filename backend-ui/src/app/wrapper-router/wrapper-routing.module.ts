import { NgModule, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'

import { DashboardModule } from '@app/dashboard/dashboard.module';
import { DetailsModule } from '@app/details/details.module';
import { TrainingModule } from '@app/training/training.module';
import { ExperienceModule } from '@app/experience/experience.module';

import { routes } from './config/routes'

@NgModule({
  imports: [
    DashboardModule,
    DetailsModule,
    TrainingModule,
    ExperienceModule,
    RouterModule.forRoot(routes, { enableTracing: isDevMode() }),
  ],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
