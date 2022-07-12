import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  myForm: UntypedFormGroup;
  taskList: any[] = [];
  id: number;
  private sub: any;

  public users: {
    id: number;
    izm: string;
    role: string;
    login: string;
    password: string;
  } = JSON.parse(localStorage.getItem('task')) ?? [];


  constructor(
    private fb2: UntypedFormBuilder,
    private appRoutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.appRoutes.params.subscribe((params) => {
      this.id = +params['id'];

    });
    this.initForm();
    this.taskList = window.localStorage.getItem('task')
      ? JSON.parse(localStorage.getItem('task'))
      : [];
  }

  private initForm() {
    this.myForm = this.fb2.group({
      izm: [
        this.users.izm ?? 'Введите имя',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      role: [this.users.role ?? 'Введите роль', [Validators.required]],
      login: [this.users.login ?? 'Введите логин', [Validators.required]],
      password: [
        this.users.password ?? 'Введите пароль',
        [Validators.required],
      ],
    });
  }
  /**Отправка формы*/
  onSubmit() {
    const value = JSON.stringify(this.myForm.value);
    this.taskList.push({ id: this.taskList.length, name: JSON.parse(value) });
    const a = JSON.stringify(this.taskList);
    localStorage.setItem('task', a);
    console.log (a)
    console.log (typeof a)
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
