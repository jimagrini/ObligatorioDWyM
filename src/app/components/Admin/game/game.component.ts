import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

    // Suscribe al servicio WebSocket para recibir mensajes
    this.socketService.getNewMessage().subscribe((activityPart: any) => {
      // Verifica si el juego ha terminado
      if (activityPart === 'fin juego') {
        this.showResults();
      }
      // Actualiza la actividad actual y fuerza la detección de cambios
      this.zone.run(() => {
        this.currentActivity = activityPart as IActivity;
      });
      this.cdr.detectChanges();
    });
  }

  // Actualiza el entorno del juego
  private async updateEnvironment(id: string): Promise<void> {
    await this.getGame(id);
    await this.getActivitiesFromGame();
    // Establece la primera actividad como la actual y muestra la siguiente
    this.currentActivity = this.activities![0];
    this.showNextActivity();
  }

  // Obtiene la información del juego
  async getGame(id: string): Promise<void> {
    try {
      this.game = await this.gameService.getGame(id).toPromise();
    } catch (error) {
      console.error(`Error fetching game: ${id}`, error);
    }
  }

  // Obtiene las actividades asociadas al juego desde la propuesta
  async getActivitiesFromGame(): Promise<void> {
    try {
      if (this.game?.proposal) {
        const proposalId = this.game.proposal._id;
        const proposal = await this.proposalService
          .getProposal(proposalId)
          .toPromise();
        this.activities = proposal?.activities || [];
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    }
  }

  // Muestra la siguiente actividad después de un intervalo de tiempo
  showNextActivity(): void {
    // Log de nombres de actividades
    this.activities?.forEach((a) => {
      console.log(a.name);
    });

    // Verifica si hay una actividad actual y si hay más actividades
    if (this.currentActivity) {
      setTimeout(() => {
        const index =
          this.activities!.findIndex(
            (activity) => activity._id === this.currentActivity!._id
          ) + 1;
        // Verifica si hay más actividades para mostrar
        if (index < this.activities!.length) {
          this.currentActivity = this.activities![index];
          this.showNextActivity();
        }
      }, 10000); // Intervalo de 10 segundos entre actividades
    } else {
      // Muestra los resultados cuando no hay más actividades
      this.showResults();
    }
  }

  // Redirecciona a la página de resultados
  showResults() {
    this.router.navigate(['/games', this.game?._id, 'results']);
  }
}
