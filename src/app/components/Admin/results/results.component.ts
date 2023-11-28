import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { WebSocketService } from 'src/app/websocket.service';
import { IGame } from 'src/app/interfaces/game';
import { ActivitiesService } from 'src/app/services/activities.service';
import { IActivity } from 'src/app/interfaces/activity';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  game?: IGame;
  topactivity?: IActivity;
  mvppoints = 0;

  constructor(
    private socketService: WebSocketService,
    private gameService: GameService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const id = params['gameId'];
      if (id) {
        await this.updateEnvironment(id);
      }
    });
  }

  private async updateEnvironment(id: string) {
    await this.getGame(id);
    await this.getWinner();
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

  async getWinner() {
    if (this.game) {
      this.game.votes= this.game.votes as Map<string, number>;
      const activityid = this.getKeyOfMaxValue(this.game.votes);
      if (activityid) {
        this.activitiesService.getActivity(activityid!).subscribe({
          next: (response: IActivity) => {
            this.topactivity = response
            console.log(`Updated voteComponent game: '${response._id}'`);
          },
          error: (error) => {
            console.error(`Error fetching game: ${activityid}`, error);
          }
        })
      }
    }

  }

  private getKeyOfMaxValue(map: Map<string, number>): string | undefined {
    if (!(map instanceof Map)) {
      console.error('Invalid map object:', map);
      return undefined;
    }
  
    let maxKey: string | undefined = undefined;
    let maxValue = Number.MIN_VALUE;
  
    for (const [key, value] of map.entries()) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    this.mvppoints = maxValue;
    return maxKey;
  }

}
