import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { UsersComponent } from './users.component';

const routes = [
  {
    path: 'user',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ProfileListComponent,
      },
      {
        path: ':id',
        component: ProfileFormComponent,
      },
      { path: '**', redirectTo: '/user' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
