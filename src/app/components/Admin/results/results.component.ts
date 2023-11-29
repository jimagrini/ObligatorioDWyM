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
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  game?: IGame; // Objeto que almacena la información del juego.
  topactivity?: IActivity; // Actividad ganadora.
  mvppoints = 0; // Puntuación de la actividad ganadora.

  constructor(
    private socketService: WebSocketService,
    private gameService: GameService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Suscribe al cambio de parámetros en la URL.
    this.route.params.subscribe(async (params: Params) => {
      const id = params['gameId'];
      if (id) {
        // Actualiza el entorno con el nuevo identificador del juego.
        await this.updateEnvironment(id);
      }
    });
  }

  // Actualiza el entorno con la información del juego.
  private async updateEnvironment(id: string) {
    // Obtiene el juego.
    await this.getGame(id);
    // Obtiene la actividad ganadora.
    await this.getWinner();
  }

  // Obtiene la información del juego.
  async getGame(id: string) {
    this.gameService.getGame(id).subscribe({
      next: (response: IGame) => {
        console.log(`Updated ResultsComponent game: '${response._id}'`);
        this.game = response;
      },
      error: (error) => {
        console.error(`Error fetching game: ${id}`, error);
      },
    });
  }

  // Obtiene la actividad ganadora.
  async getWinner() {
    if (this.game) {
      // Convierte los votos en un objeto Map si aún no lo es.
      this.game.votes = this.game.votes as Map<string, number>;
      // Obtiene el ID de la actividad con la mayor cantidad de votos.
      const activityid = this.getKeyOfMaxValue(this.game.votes);
      if (activityid) {
        // Obtiene la información de la actividad ganadora.
        this.activitiesService.getActivity(activityid!).subscribe({
          next: (response: IActivity) => {
            this.topactivity = response;
            console.log(`Updated ResultsComponent game: '${response._id}'`);
          },
          error: (error) => {
            console.error(`Error fetching game: ${activityid}`, error);
          },
        });
      }
    }
  }

  // Obtiene la clave (ID de actividad) del valor máximo en un objeto Map.
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
    // Almacena la puntuación de la actividad ganadora.
    this.mvppoints = maxValue;
    return maxKey;
  }
}
