import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { DashboardModule } from '@app/dashboard/dashboard.module';

import { routes } from './config/routes'

@NgModule({
  imports: [
    DashboardModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
