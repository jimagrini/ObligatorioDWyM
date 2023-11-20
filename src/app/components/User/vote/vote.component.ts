import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from 'src/app/interfaces/activity';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  constructor(private route: ActivatedRoute, private gameService: GameService) {  }

  submitVote(value: number) {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    const activityId = this.route.snapshot.paramMap.get('activityId');
    if (gameId && activityId) {
      this.gameService.vote(gameId, activityId, value);
    }
  }
}
