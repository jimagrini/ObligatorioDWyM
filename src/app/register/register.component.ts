import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../admin.service';
import { IActivity } from '../activity/IActivity';
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

  model = { fullName: 'Luis Suarez', username: 'LuchoSuarez9', password: 'qhiud2xka526ubcds8', email: 'luis.suarez@gmail.com' };

  submitted = false;
  onSubmit() { this.submitted = true; }

  newAdmin(): void {
    const newAdmin = { id: this.index, fullName: this.model.fullName, username: this.model.username, password: this.model.password, email: this.model.email } as IAdmin;
    this.index++;
    this.adminService.addAdmin(newAdmin);
    this.goBack();
    this.submitted = false;
  }
  goBack(): void {
    this.location.back();
  }
}
