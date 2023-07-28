import { Routes } from '@angular/router' // CLI imports router
import { DashboardComponent } from '@app/ui/dashboard/dashboard.component'
import { DetailsComponent } from '@app/ui/details/details.component'
import { ExperienceComponent } from '@app/ui/experience/experience.component'
import { MessagingSystemComponent } from '@app/ui/messaging-system/messaging-system.component'
import { NotFoundComponent } from '@app/ui/not-found/not-found.component'
import { OthersComponent } from '@app/ui/others/others.component'
import { SettingsComponent } from '@app/ui/settings/settings.component'
import { SkillsComponent } from '@app/ui/skills/skills.component'
import { TrainingComponent } from '@app/ui/training/training.component'
import { TranslationComponent } from '@app/ui/translations/translations.component'

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `DashboardComponent`
    { path: 'dashboard', component: DashboardComponent },

    { path: 'details', component: DetailsComponent },

    { path: 'experience', redirectTo: 'experience/', pathMatch: 'full' },
    { path: 'experience/:type', component: ExperienceComponent },

    { path: 'messaging', redirectTo: 'messaging/', pathMatch: 'full' },
    { path: 'messaging/:type', component: MessagingSystemComponent },

    { path: 'others', redirectTo: 'others/', pathMatch: 'full' },
    { path: 'others/:type', component: OthersComponent },

    { path: 'settings', component: SettingsComponent },

    { path: 'skills', redirectTo: 'skills/', pathMatch: 'full' },
    { path: 'skills/:type', component: SkillsComponent },

    { path: 'training', redirectTo: 'training/', pathMatch: 'full' },
    { path: 'training/:type', component: TrainingComponent },

    { path: 'translations', redirectTo: 'translations/', pathMatch: 'full' },
    { path: 'translations/:type', component: TranslationComponent },


    { path: '**', component: NotFoundComponent },
]
