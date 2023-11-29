import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IAdmin } from '../../../interfaces/admin';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Formulario para recopilar la información del nuevo administrador.
  form: FormGroup;

  constructor(private adminService: AdminService, private location: Location) {
    // Inicializa el formulario con controles para el nombre de usuario y la contraseña.
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  // Método para registrar un nuevo administrador.
  async registerAdmin() {
    // Llama al servicio de administrador para realizar el registro.
    this.adminService
      .register(this.form.value.username, this.form.value.password)
      .pipe(
        catchError((error) => {
          // Maneja errores, muestra un mensaje y lanza el error.
          console.error(error);
          alert(
            'Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.'
          );
          throw error;
        })
      )
      .subscribe({
        // En caso de éxito, muestra el administrador registrado en la consola y muestra un mensaje de éxito.
        next: (response: IAdmin) => {
          console.log(response);
          alert('Usuario registrado con éxito!');
          // Navega hacia atrás (página anterior) después del registro.
          this.goBack();
          // También se podría redirigir a la página de propuestas u otra página necesaria.
        },
        // En caso de error, muestra el error y un mensaje de error.
        error: (error) => {
          console.error(error);
          alert(
            'Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.'
          );
        },
      });
  }

  /** Regresa a la página anterior ('home' en este caso).
   *
   */
  goBack(): void {
    this.location.back();
  }
}
