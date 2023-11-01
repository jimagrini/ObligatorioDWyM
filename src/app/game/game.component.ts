import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../activities/IActivity';
/*import { GameService } from '../game.service'; */

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  activities: IActivity[] = [];
  currentActivity: IActivity | null = null;
  votes: { [activityId: string]: number } = {};
  showResults = false;

  constructor(private route: ActivatedRoute/*, private gameService: GameService*/) {
  }

  ngOnInit(): void {
    /*this.route.params.subscribe(params => {
      const gameUrl = params['gameUrl'];
      const game = this.gameService.getGameByUrl(gameUrl);
      if (game) {
        this.currentActivity = game;
      } else {
        console.error('Juego no encontrado');
      }
    });*/
  }

  startGame(): void {
    this.showResults = false;
    this.votes = {};
    this.showNextActivity();
  }

  showNextActivity(): void {
    if (this.currentActivity) {
      setTimeout(() => {

        /* implementar votaciones */

        const index = this.activities.indexOf(this.currentActivity!) + 1;
        if (index < this.activities.length) {
          this.currentActivity = this.activities[index];
          this.showNextActivity();
        } else {
          this.showResults= true;
        }
      }, 10000); 
    }
  }

  vote(vote: number): void {
    if(this.currentActivity){
      this.votes[this.currentActivity.id] += vote;
    }
  }
}