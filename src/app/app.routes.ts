import { Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
  {
    path: 'task-form',
    component: TaskFormComponent,
  },
  {
    path: 'chart',
    component: ChartsComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: '**',
    component: TaskFormComponent,
  },
];
