import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IAdmin } from '../IAdmin';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(private adminService: AdminService, private location: Location) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  async registerAdmin() {
    this.adminService.register(this.form.value.username, this.form.value.password)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.');
          throw error;
        })
      )
      .subscribe({
        next: (response: IAdmin) => {
          console.log(response);
          alert('Usuario registrado con éxito!');
          this.goBack();
          // llevar a proposals
        },
        error: (error) => {
          console.error(error);
          alert('Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.');
        }
      });
  }

  /** Returns user to previous page 'home'
   * 
   */
  goBack(): void {
    this.location.back();
  }
}
