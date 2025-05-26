import { Routes } from '@angular/router';
import { CarListComponent } from './car-list.component';
import { CarFormComponent } from './car-form.component';

export const carRoutes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'new', component: CarFormComponent },
  { path: ':id/edit', component: CarFormComponent }
];
