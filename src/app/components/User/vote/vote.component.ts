import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IGame } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { WebSocketService } from 'src/app/websocket.service';
import { IActivity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  game?: IGame;
  activities?: IActivity[];
  currentActivity?: IActivity;
  canVote: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private socketService: WebSocketService,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const id = params['gameId'];
      if (id) {
        await this.updateEnvironment(id);
      }
    });

    this.socketService.getNewMessage().subscribe((activityPart: IActivity) => {
      console.log(activityPart);
      this.zone.run(() => {
        this.currentActivity = activityPart;
        this.canVote = true;
      });
      this.cdr.detectChanges();
    });
  }


  private async updateEnvironment(id: string) {
    await this.getGame(id);
    await this.getCurrentActivity();
    this.currentActivity = this.game?.currentActivity;
  }

  async getGame(id: string) {
    this.gameService.getGame(id)
      .subscribe({
        next: (response: IGame) => {
          console.log(`Updated voteComponent game: '${response._id}'`);
          this.game = response;
        },
        error: (error) => {
          console.error(`Error fetching game: ${id}`, error);
        }
      });
  }

  async getCurrentActivity() {
    try {
      if (this.game?.proposal) {
        this.currentActivity = this.game.currentActivity;
      }
    } catch (error) {
      console.error('Error fetching current Activity:', error);
    }
  }

  submitVote(value: number) {
    if (this.game && this.currentActivity && this.canVote) {
      const activityId = this.currentActivity._id;
      this.gameService.vote(this.game._id, activityId, value).subscribe(
        (voteResponse: boolean) => {
          this.canVote = false;
          console.log('Voto registrado:', voteResponse);
        },
        (voteError: any) => {
          console.error('Error al votar:', voteError);
        }
      );
    }
  }
}
