import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IAdmin } from '../IAdmin';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

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

  // Default shown on Register Form

  async onSubmit() {
    const response = await this.adminService.register(this.form.value);
    this.adminService.add(this.form.value.username, this.form.value.password);
    console.log(response);
    alert('Usuario registrado con exito!');
    this.goBack();
  }

  /** Creates admin user.
   * Calls addAdmin() method from adminService. Returns model attributes
   * to its initial values. Redirects user to the previous page 'home'.
   *
   *  PENDIENTE: Validar que el username no exista (sea unico).
  */

  /** Returns user to previous page 'home'
   * 
   */
  goBack(): void {
    this.location.back();
  }
}
