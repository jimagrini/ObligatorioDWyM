import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../../../interfaces/activity';
import { AdminService } from '../../../services/admin.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { IGame } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { IProposal } from 'src/app/interfaces/proposal';
import { Params } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  game?: IGame;
  activities?: IActivity[];
  currentActivity?: IActivity;

  constructor(
    private route: ActivatedRoute,
    private socketService: WebSocketService,
    private gameService: GameService,
    private proposalService: ProposalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.getGame(id);
        this.getActivitiesFromGame(id).then(() => {
          this.currentActivity = this.activities![0];
        });
      }
    });
    this.socketService.getNewMessage().subscribe((activityPart: IActivity) => {
      console.log(activityPart);
      this.currentActivity = activityPart;
    });
  }

  async getGame(id: string): Promise<void> {
    this.gameService.getGame(id).subscribe(
      (game: IGame) => {
        this.game = game;
      },
      (error) => {
        console.error(`Error fetching game: ${id}`, error);
      }
    );
  }

  getActivitiesFromGame(gameId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.game && this.game.proposal) {
        const proposalId = this.game.proposal._id;
        this.proposalService.getProposal(proposalId).subscribe(
          (proposal: IProposal) => {
            this.activities = proposal.activities;
            resolve(); // Resuelve la promesa una vez que se obtienen las actividades
          },
          (error) => {
            console.error('Error fetching proposal:', error);
            reject(error); // Rechaza la promesa si hay un error
          }
        );
      }
    });
  }

  showNextActivity(): void {
    this.activities?.forEach(a => {
      console.log(a.name);
    })
    if (this.currentActivity) {
      setTimeout(() => {
        const index = this.activities!.findIndex((activity) => activity._id === this.currentActivity!._id) + 1;
        if (index < this.activities!.length) {
          this.currentActivity = this.activities![index];
          this.showNextActivity();
        } else {
          this.showResults();
        }
      }, 10000);
    }
  }

  showResults() {

  }
}