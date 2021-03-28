import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { UsersComponent } from './users.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { UsersStore } from './store/users.store';

@NgModule({
  declarations: [
    UsersComponent,
    ProfileListComponent,
    ProfileCardComponent,
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [UsersStore],
})
export class UsersModule {}
