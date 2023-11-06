import { Component} from '@angular/core';
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

  index = 100;

  model = { fullName: 'Tu Nombre', username: 'nombre_usuario', password: 'qhiud2xka526ubcds8', email: 'usuario@gmail.com' };

  submitted = false;
  onSubmit() { this.submitted = true; }

  newAdmin(): void {
    const newAdmin = { id: this.index, fullName: this.model.fullName, username: this.model.username, password: this.model.password, email: this.model.email } as IAdmin;
    this.index++;
    this.adminService.addAdmin(newAdmin);
    alert('Usuario registrado con exito!');
    this.model = { fullName: 'Tu Nombre', username: 'nombre_usuario', password: 'qhiud2xka526ubcds8', email: 'usuario@gmail.com' };
    this.submitted = false;
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
}
