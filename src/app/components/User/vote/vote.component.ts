import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGame } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  submitVote(value: number) {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.gameService.getGame(gameId!).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
      .subscribe({
        next: (response: IGame) => {
          if (response) {
            const activityId = response.currentActivity._id;
            this.gameService.vote(gameId!, activityId, value).subscribe(
              (voteResponse: boolean) => {
                console.log('Voto registrado:', voteResponse);
              },
              (voteError: any) => {
                console.error('Error al votar:', voteError);
              }
            );
          }
        },
        error: (getError: any) => {
          console.error('Error al obtener el juego:', getError);
        }
      });
  }
}
