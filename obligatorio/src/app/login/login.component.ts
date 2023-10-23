import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router) {}

  login(): void {
    // Check username and password
    if (this.username === 'admin' && this.password === 'password') {
      // Navigate to the admin component
      this.router.navigate(['/admin']);
    } else {
      // Show error message or handle invalid login
    }
  }
}