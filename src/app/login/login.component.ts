 import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../home/home.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private router: Router) {}
  login(): void {
    // Perform authentication logic, e.g., check username and password
   /* if (this.username === 'admin' && this.password === 'password') {
      // Generate JWT token
      const token = jwt.sign({ username: this.username }, 'secret-key');

      // Store the token in local storage or session storage
      localStorage.setItem('token', token);

      // Redirect to the desired route
      this.router.navigate(['/dashboard']);
    } else {
      // Show error message or handle invalid login
    }*/
  }
}