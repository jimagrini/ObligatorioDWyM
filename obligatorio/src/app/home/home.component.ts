import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  gameUrl?: string;

  constructor(private router: Router) {}

  loginAsAdmin(): void {
    // Implement the logic to handle login as an admin
    // For example, you can navigate to the login component for admin login
    this.router.navigate(['/login']);
  }

  joinGame(): void {
    // Implement the logic to handle joining a game using the entered URL
    // For example, you can navigate to the game component with the entered URL
    this.router.navigate(['/game', this.gameUrl]);
  }
}