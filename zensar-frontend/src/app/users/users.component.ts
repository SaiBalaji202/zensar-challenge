import { Component, OnInit } from '@angular/core';
import { UsersStore } from '@app/users/store/users.store';

@Component({
  selector: 'zensar-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(public usersStore: UsersStore) {}

  ngOnInit(): void {}
}
