import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
interface IUser {
  id: number;
  name: {
    izm: string;
    role: string;
    login: string;
    password: string;
  };
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  public myForm: FormGroup;
  public users: IUser[] = JSON.parse(localStorage.getItem('task')) ?? [];


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['Введите имя', [Validators.required]],
      role: ['Введите пароль', [Validators.required]],
      login: ['Введите логин', [Validators.required]],
      password: ['Введите пароль', [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      // eсли id передать человека
      const id = +params['id'];
      const currentUser: IUser = this.users.find(user => user.id === id);
      // Обновить форму
      this.myForm.patchValue({
        name: currentUser.name.izm,
        role: currentUser.name.role,
        login: currentUser.name.login,
        password: currentUser.name.password
      });

    });
  }
  onSubmit() {
    /**Обработка данных формы и запись в localstorage*/
    const str = JSON.stringify(this.myForm.value);
    localStorage.setItem('task', str);
  }
}
