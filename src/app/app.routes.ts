import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'favorites', component: FavoritesComponent
    }
];
