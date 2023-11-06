import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gameUrl?: string;
  overlayRight:boolean = false;

  constructor(private router: Router/*, private gameService: GameService*/) {}

  ngOnInit(): void {
  }

  loginAsAdmin(): void {
    this.router.navigate(['/login']);
  }

  joinGame(): void {
  /*
    if (this.gameUrl) {
      const game = this.gameService.getGameByUrl(this.gameUrl);
      if (game) {
        this.router.navigate(['/game', this.gameUrl]);
      } else {
      alert('Por favor, ingresa un código de juego');
      }
  }*/
    this.router.navigate(['/game', this.gameUrl]);
  }  

  toggleOverlay(): void {
    this.overlayRight = !this.overlayRight;
  }
}
