import { Routes } from '@angular/router'; // CLI imports router
import { DashboardComponent } from '@app/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `DashboardComponent`
    { path: 'dashboard', component: DashboardComponent },
];