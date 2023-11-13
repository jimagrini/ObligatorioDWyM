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

  model = { username: 'nombre_usuario', password: 'qhiud2xka526ubcds8'};

  submitted = false;
  onSubmit() { this.submitted = true; }

  registerAdmin(): void {
    this.adminService.addAdmin(this.model.username, this.model.password);
    alert('Usuario registrado con exito!');
    this.model = { username: 'nombre_usuario', password: 'qhiud2xka526ubcds8'};
    this.submitted = false;
    this.goBack();
  }
  
  goBack(): void {
    this.location.back();
  }
}
