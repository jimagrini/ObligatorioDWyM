import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/game';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
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
    const id = this.route.snapshot.paramMap.get('gameId');
    if (id) {
      this.getGame(id);
    }
    
  }

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

  startGame() {
    if (this.game) {
      const gameId = this.game._id;
      if (gameId) {
        this.gameService.startGame(gameId).subscribe(
          (success: boolean) => {
            console.log(`Game started: ${success}`);
            try {
              this.socketService.startGame(gameId);
            } catch (error) {
              console.error('Error sending startGame event:', error);
            }
            this.router.navigate(['/games', gameId, 'activities']);
          },
          (error) => {
            console.error(`Error starting Game: ${gameId}`, error);    
          }
        );
      } else {
        console.error("Game ID is undefined");
      }
    } else {
      console.error("Game is undefined");
    }
  }
}