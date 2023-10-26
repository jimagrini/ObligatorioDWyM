import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../IActivity';
import { IVote } from '../IVote';
/*import { GameService } from '../game.service'; */

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  activities: IActivity[] = [];
  currentActivity: IActivity | null = null;
  votes: IVote[] = [];
  shownResult = false;

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
    this.shownResult = false;
    this.votes = [];
    this.showNextActivity();
  }

  showNextActivity(): void {
    if (this.currentActivity) {
      setTimeout(() => {
        const vote: IVote = { activityId: this.currentActivity!.id, value: 0 };
        this.votes.push(vote);
        const nextIndex = this.activities.indexOf(this.currentActivity!) + 1;
        if (nextIndex < this.activities.length) {
          this.currentActivity = this.activities[nextIndex];
          this.showNextActivity();
        } else {
          this.showResults();
        }
      }, 10000); 
    }
  }

  vote(vote: number): void {
    if (this.currentActivity) {
      const voteObj: IVote = { activityId: this.currentActivity.id, value: vote };
      this.votes.push(voteObj);
      const next = this.activities.indexOf(this.currentActivity) + 1;
      if (next < this.activities.length) {
        this.currentActivity = this.activities[next];
        this.showNextActivity();
      } else {
        this.showResults();
      }
    }
  }

  showResults(): void {
    this.shownResult = true;
  }
}