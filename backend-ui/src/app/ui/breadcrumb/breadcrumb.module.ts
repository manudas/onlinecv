import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslationServiceModule } from '@services/translation'
import { SpecialCharsModule } from '@app/services/specialChars'

import { BreadcrumbComponent } from './breadcrumb.component'
import { BreadcrumbService } from './service/breadcrumb.service'
@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslationServiceModule,
    SpecialCharsModule
  ],
  exports: [BreadcrumbComponent],
  providers: [BreadcrumbService]
})
export class BreadcrumbModule { }
