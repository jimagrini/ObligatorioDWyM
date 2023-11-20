import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { SecurityService } from '../Admin/interceptor/securityService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  overlayRight: boolean = false;

  gameCode: string = ''; // Initialize as empty string
  nickname: string = ''; // Initialize as empty string

  constructor(private router: Router, private gameService: GameService, private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  loginAsAdmin(): void {
    this.router.navigate(['/login']);
  }

  toggleOverlay(): void {
    this.overlayRight = !this.overlayRight;
  }

  joinGame(): void {
    if (this.gameCode?.trim() !== '' && this.nickname?.trim() !== '') {
      this.gameService.addUser(this.gameCode, this.nickname).subscribe(
        (response: any) => {
          if (response && response.response && response.response.token) {
            const token = response.response.token; // Extract the token from the response
            this.securityService.SetAuthData(token);
            sessionStorage.setItem('token', token);
            this.router.navigate(['/games', this.gameCode, 'waiting-room']);
          } else if (response && response.error) {
            console.error('Error:', response.error);
            // Handle the error response from the backend
          } else {
            console.error('Token not found in the response');
            // Handle other unexpected responses
          }
        },
        (err) => {
          console.log('Error al Iniciar Sesión', err);
        }
      );
    } else {
      console.error('Game code and nickname are required.');
    }
  }
}
