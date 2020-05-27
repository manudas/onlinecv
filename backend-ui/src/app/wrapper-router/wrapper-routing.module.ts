import { NgModule, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'

import { DashboardModule } from '@app/ui/dashboard/dashboard.module';
import { DetailsModule } from '@app/ui/details/details.module';
import { TrainingModule } from '@app/ui/training/training.module';
import { ExperienceModule } from '@app/ui/experience/experience.module';

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
