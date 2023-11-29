import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { SecurityService } from '../Admin/interceptor/securityService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  overlayRight: boolean = false;

  gameCode: string = ''; // Inicializado como una cadena vacía
  nickname: string = ''; // Inicializado como una cadena vacía

  constructor(
    private router: Router,
    private gameService: GameService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    // Lógica de inicialización si es necesario
  }

  loginAsAdmin(): void {
    // Navega a la página de inicio de sesión del administrador
    this.router.navigate(['/login']);
  }

  toggleOverlay(): void {
    // Cambia el estado de la superposición (overlay)
    this.overlayRight = !this.overlayRight;
  }

  joinGame(): void {
    if (this.gameCode?.trim() !== '' && this.nickname?.trim() !== '') {
      // Verifica que el código del juego y el apodo no estén vacíos

      // Llama al servicio para agregar al usuario al juego
      this.gameService.addUser(this.gameCode, this.nickname).subscribe(
        (response: any) => {
          if (response && response.response && response.response.token) {
            // Si se recibe un token en la respuesta, autentica al usuario y navega a la sala de espera
            const token = response.response.token;
            this.securityService.SetAuthData(token);
            sessionStorage.setItem('token', token);
            this.router.navigate(['/games', this.gameCode, 'waiting-room']);
          } else if (response && response.error) {
            // Maneja errores si se recibe un objeto de error en la respuesta
            console.error('Error:', response.error);
            // Maneja el error de acuerdo a los requisitos de la aplicación
          } else {
            console.error('Token not found in the response');
            // Maneja otras respuestas inesperadas
          }
        },
        (err) => {
          console.log('Error al Iniciar Sesión', err);
          // Maneja errores de la solicitud HTTP
        }
      );
    } else {
      console.error('Game code and nickname are required.');
      // Maneja el caso donde el código del juego y el apodo son obligatorios
    }
  }
}
