import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/game';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent {
  game?: IGame;
  users: IUser[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del juego desde la URL
    const id = this.route.snapshot.paramMap.get('gameId');
    if (id) {
      // Llama al método para obtener y mostrar detalles del juego
      this.getGame(id);
    }
  }

  // Método para obtener detalles del juego
  getGame(id: string): void {
    this.gameService.getGame(id).subscribe(
      (game: IGame) => {
        this.game = game;
      },
      (error) => {
        console.error(`Error fetching Game: ${id}`, error);
      }
    );
  }

  // Método para iniciar el juego
  startGame() {
    if (this.game) {
      const gameId = this.game._id;
      if (gameId) {
        // Llama al servicio para iniciar el juego
        this.gameService.startGame(gameId).subscribe(
          (success: boolean) => {
            // Navega a la vista de actividades del juego
            this.router.navigate(['/games', gameId, 'activities']);
          },
          (error) => {
            console.error(`Error starting Game: ${gameId}`, error);
          }
        );
      } else {
        console.error('Game ID is undefined');
      }
    } else {
      console.error('Game is undefined');
    }
  }
}
