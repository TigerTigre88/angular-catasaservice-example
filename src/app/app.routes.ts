import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

/**
 * This object configure routing paths
 *
 * @type {Routes}
 */
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
];
