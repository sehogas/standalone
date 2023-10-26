import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', loadComponent: () =>
        import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        title: 'home'
    },
    {
        path: 'main', loadComponent: () =>
        import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        title: 'home'
    },
    {
        path: 'profile', loadComponent: () => 
        import('./components/profile/profile.component').then(m => m.ProfileComponent), 
        title: 'Profile'
    },
];
