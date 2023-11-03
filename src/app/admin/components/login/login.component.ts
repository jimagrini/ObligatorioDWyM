import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from './ILogin';
import { IResponse } from '../../../IResponse';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy{
  formLogin: FormGroup;
  subRef$!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
  }

  login(): void {
    const userLogin : ILogin = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };

    this.subRef$ = this.http.post<IResponse>('http://localhost:4200/login', userLogin, {observe: 'response'})
    .subscribe(res => {
      const token = res.body!.response;
      console.log('token', token);
      sessionStorage.setItem('token', token);
      this.router.navigate(['/proposal']);
    }, err => {
      console.log('Error en el login', err);
    });
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}