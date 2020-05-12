import { Routes } from '@angular/router'; // CLI imports router
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { DetailsComponent } from '@app/details/details.component';
import { TrainingComponent } from '@app/training/training.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `DashboardComponent`
    { path: 'dashboard', component: DashboardComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'training', component: TrainingComponent },
    { path: '**', redirectTo: 'dashboard' }, // maybe will be worthy to change if I found a nice 404 page in the future
];