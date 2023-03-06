import { NgModule, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'

import { DashboardModule } from '@app/ui/dashboard/dashboard.module'
import { DetailsModule } from '@app/ui/details/details.module'
import { ExperienceModule } from '@app/ui/experience/experience.module'
import { OthersModule } from '@app/ui/others/others.module'
import { NotFoundModule } from '@ui/not-found/not-found.module'
import { routes } from './config/routes'
import { SkillsModule } from '@app/ui/skills/skills.module'
import { TrainingModule } from '@app/ui/training/training.module'
import { TranslationsModule } from '@app/ui/translations/translations.module'
import { TranslationServiceModule } from '@app/services/translation'
import { SettingsModule } from '@app/ui/settings/settings.module'
import { APP_BASE_HREF } from '@angular/common'

@NgModule({
    imports: [
        DashboardModule,
        DetailsModule,
        ExperienceModule,
        OthersModule,
        NotFoundModule,
        TrainingModule,
        SkillsModule,
        TranslationsModule,
        TranslationServiceModule,
        SettingsModule,
        RouterModule.forRoot(routes, {
            enableTracing: isDevMode()
        }),
    ],
    exports: [RouterModule],
    providers: [

    ]
})
export class WrapperRoutingModule {}