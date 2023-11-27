import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/game';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {

  game?: IGame;
  users: IUser[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService) { }

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
      this.gameService.startGame(this.game._id).subscribe(
        (success: boolean) => {
          console.log(`Game started: ${success}`);
          this.router.navigate(['/games', this.game!._id, 'activities']);
        },
        (error) => {
          console.error(`Error starting Game: ${this.game!._id}`, error);
        }
      );
    }
  }

}
