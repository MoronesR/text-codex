import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  {
    path: 'cars',
    loadChildren: () => import('./cars/car.routes').then(m => m.carRoutes)
  }
];
