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
    this.router.navigate(['/login']);
  }

  joinGame(): void {
    this.router.navigate(['/game', this.gameUrl]);
  }
}