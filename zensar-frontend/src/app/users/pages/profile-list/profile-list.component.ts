import { Component, OnInit } from '@angular/core';
import { UsersStore } from '@app/users/store/users.store';
import { Router } from '@angular/router';

@Component({
  selector: 'zensar-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  constructor(public usersStore: UsersStore, private router: Router) {}

  ngOnInit(): void {}

  navigateToUserForm(userId = 'new'): void {
    this.router.navigate(['/user', userId]);
  }
}
