import { Routes } from '@angular/router'; // CLI imports router
import { DashboardComponent } from '@app/ui/dashboard/dashboard.component';
import { DetailsComponent } from '@app/ui/details/details.component';
import { TrainingComponent } from '@app/ui/training/training.component';
import { ExperienceComponent } from '@app/ui/experience/experience.component';

import { NotfoundComponent } from '@app/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `DashboardComponent`
    { path: 'dashboard', component: DashboardComponent },
    
    { path: 'details', component: DetailsComponent },
    
    { path: 'training', redirectTo: 'training/', pathMatch: 'full' },
    { path: 'training/:type', component: TrainingComponent },
    
    { path: 'experience', redirectTo: 'experience/', pathMatch: 'full' },
    { path: 'experience/:type', component: ExperienceComponent },

    { path: 'others', redirectTo: 'others/', pathMatch: 'full' },
    { path: 'others/:type', component: ExperienceComponent },

    { path: 'notfound', component: NotfoundComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' },
];
