import { Routes } from '@angular/router' // CLI imports router
import { DashboardComponent } from '@app/ui/dashboard/dashboard.component'
import { DetailsComponent } from '@app/ui/details/details.component'
import { TrainingComponent } from '@app/ui/training/training.component'
import { ExperienceComponent } from '@app/ui/experience/experience.component'
import { OthersComponent } from '@app/ui/others/others.component'
import { SkillsComponent } from '@app/ui/skills/skills.component'
import { TranslationComponent } from '@app/ui/translations/translations.component'
import { SettingsComponent } from '@app/ui/settings/settings.component'
import { NotFoundComponent } from '@app/ui/not-found/not-found.component'

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `DashboardComponent`
    { path: 'dashboard', component: DashboardComponent },

    { path: 'details', component: DetailsComponent },

    { path: 'training', redirectTo: 'training/', pathMatch: 'full' },
    { path: 'training/:type', component: TrainingComponent },

    { path: 'experience', redirectTo: 'experience/', pathMatch: 'full' },
    { path: 'experience/:type', component: ExperienceComponent },

    { path: 'skills', redirectTo: 'skills/', pathMatch: 'full' },
    { path: 'skills/:type', component: SkillsComponent },

    { path: 'others', redirectTo: 'others/', pathMatch: 'full' },
    { path: 'others/:type', component: OthersComponent },

    { path: 'translations', redirectTo: 'translations/', pathMatch: 'full' },
    { path: 'translations/:type', component: TranslationComponent },

    { path: 'settings', component: SettingsComponent },

    { path: '**', component: NotFoundComponent },
]
