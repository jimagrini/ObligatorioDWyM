import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAdmin } from '../IAdmin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  gameUrl?: string;
  overlayRight:boolean = false;
  
  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
  }

  loginAsAdmin(): void {
    this.router.navigate(['/login']);
  }

  joinGame(): void {
    this.router.navigate(['/game', this.gameUrl]);
  }  

  toggleOverlay(): void {
    this.overlayRight = !this.overlayRight;
  }

  addAdmin(admin: IAdmin): void {
    this.adminService.addAdmin(admin);
  }

  showRegisterForm = false;
  toggleRegisterForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
    const button = document.getElementById('form-button');
    if (this.showRegisterForm) {
      button!.textContent = 'Ocultar Formulario';
    } else {
      button!.textContent = 'Crear Usuario';
    }
  }
}