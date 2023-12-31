import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Params , Router  } from '@angular/router';
import { IActivity } from '../../../interfaces/activity';
import { WebSocketService } from 'src/app/websocket.service';
import { IGame } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { ProposalService } from 'src/app/services/proposal.service';

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
    private proposalService: ProposalService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const id = params['gameId'];
      if (id) {
        await this.updateEnvironment(id);
      }
    });

    this.socketService.getNewMessage().subscribe((activityPart: any) => {
      if(activityPart === "fin juego"){
        this.showResults();
      }
      this.zone.run(() => {
        this.currentActivity = activityPart as IActivity;
      });
      this.cdr.detectChanges(); 
    });
  }

  private async updateEnvironment(id: string): Promise<void> {
    await this.getGame(id);
    await this.getActivitiesFromGame();
    this.currentActivity = this.activities![0];
    this.showNextActivity();
  }

  async getGame(id: string): Promise<void> {
    try {
      this.game = await this.gameService.getGame(id).toPromise();
    } catch (error) {
      console.error(`Error fetching game: ${id}`, error);
    }
  }

  async getActivitiesFromGame(): Promise<void> {
    try {
      if (this.game?.proposal) {
        const proposalId = this.game.proposal._id;
        const proposal = await this.proposalService.getProposal(proposalId).toPromise();
        this.activities = proposal?.activities || [];
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    }
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
        } 
      }, 10000);
    }else {
      this.showResults();
    }
  }

  showResults() {
    this.router.navigate(["/games", this.game?._id, "results"]);
  }
}