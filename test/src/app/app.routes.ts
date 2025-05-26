import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'autos', pathMatch: 'full' },
  {
    path: 'autos',
    loadComponent: () => import('./cars/car-list.component').then(m => m.CarListComponent)
  }
];
