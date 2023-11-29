import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../../interfaces/login';
import { IResponse } from './IResponse';
import { Subscription } from 'rxjs/internal/Subscription';
import { SecurityService } from '../interceptor/securityService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subRef$!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    // Inicializa el formulario de inicio de sesión con validadores
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Verifica si hay un token en la sesión al iniciar el componente
    const token = sessionStorage.getItem('token');
  }

  // Método para manejar el evento de inicio de sesión
  login(): void {
    // Obtiene las credenciales del formulario
    const userLogin: ILogin = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };

    // Realiza la solicitud de inicio de sesión al servidor
    this.subRef$ = this.http.post<IResponse>('http://localhost:3000/api/admins/login', userLogin, { observe: 'response' })
      .subscribe(res => {
        // Obtiene el token de la respuesta y lo almacena en el servicio de seguridad
        const token = res.body!.response;
        console.log('token', token);
        this.securityService.SetAuthData(token);
        
        // Almacena el token en la sesión del navegador
        sessionStorage.setItem('token', token);
        
        // Navega al componente del menú después de un inicio de sesión exitoso
        this.router.navigate(['/menu']);
      }, err => {
        console.log('Error al Iniciar Sesión', err);
      });
  }

  // Método para manejar la destrucción del componente y cancelar las suscripciones
  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}
