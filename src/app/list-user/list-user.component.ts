import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users?: User[] = JSON.parse(localStorage.getItem('users') as string);
  constructor() {}

  ngOnInit(): void {
    this.saveUser();
  }

  saveUser() {
    if (!this.users) {
      localStorage.setItem('users', `[]`);
    }
  }
}
