import { Routes } from '@angular/router';
import { FeatureHomeComponent } from './feature-home/feature-home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: FeatureHomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
