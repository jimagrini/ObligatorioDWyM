import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IAdmin } from '../IAdmin';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private adminService: AdminService, private location: Location) { }

  // Default shown on Register Form
  model = { username: 'nombre_usuario', password: 'qhiud2xka526ubcds8' };

  submitted = false;
  onSubmit() { this.submitted = true; }

  /**
   * Calls addAdmin() method from adminService. Returns model attributes
   * to its initial values. Redirects user to the previous page 'home'.
   *
   *  PENDIENTE: Validar que el username no exista (sea unico).
  */
  add(): void {
    if (this.model.username, this.model.password) {
      this.adminService.addAdmin(this.model.username, this.model.password);
      alert('Usuario registrado con exito!');
      this.model = { username: 'nombre_usuario', password: 'qhiud2xka526ubcds8' };
      this.submitted = false;
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
