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
    // Suscribe a los cambios en los parámetros de la URL, específicamente el ID del juego
    this.route.params.subscribe(async (params: Params) => {
      const id = params['gameId'];
      if (id) {
        await this.updateEnvironment(id);
      }
    });

    // Suscribe al servicio WebSocket para recibir mensajes relacionados con la actividad actual
    this.socketService.getNewMessage().subscribe((activityPart: IActivity) => {
      console.log(activityPart);
      this.zone.run(() => {
        this.currentActivity = activityPart;
        this.canVote = true;
      });
      this.cdr.detectChanges();
    });
  }

  // Actualiza el entorno del componente con la información del juego y la actividad actual
  private async updateEnvironment(id: string) {
    await this.getGame(id);
    await this.getCurrentActivity();
    this.currentActivity = this.game?.currentActivity;
  }

  // Obtiene la información del juego usando el ID proporcionado
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

  // Obtiene la actividad actual del juego
  async getCurrentActivity() {
    try {
      if (this.game?.proposal) {
        this.currentActivity = this.game.currentActivity;
      }
    } catch (error) {
      console.error('Error fetching current Activity:', error);
    }
  }

  // Registra un voto para la actividad actual en el juego
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
