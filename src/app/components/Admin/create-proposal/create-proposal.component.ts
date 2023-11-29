import { Component, Input } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { IProposal } from '../../../interfaces/proposal';
import { ProposalService } from '../../../services/proposal.service';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/game';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css'],
})
export class CreateProposalComponent {
  // Input para recibir actividades seleccionadas desde el componente padre
  @Input() selectedActivities: IActivity[] = [];

  // Propiedad para almacenar la propuesta creada
  proposal?: IProposal;

  constructor(
    private proposalService: ProposalService,
    private gameService: GameService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.getActivities();
  }

  /**
   * Método para crear una propuesta
   * @param name - Nombre de la propuesta
   */
  createProposal(name: string): void {
    if (this.selectedActivities.length >= 2 && name) {
      // Llamada al servicio para agregar una nueva propuesta
      this.proposalService
        .add(name, this.selectedActivities)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert(
              'Ocurrió un error al crear la propuesta. Por favor, intente nuevamente.'
            );
            throw error;
          })
        )
        .subscribe({
          next: (response: IProposal) => {
            console.log(response);
            alert('Propuesta creada con éxito!');
            // Desmarca las actividades seleccionadas y limpia el arreglo
            this.selectedActivities.forEach((act) => (act.selected = false));
            this.proposal = response;
            this.selectedActivities = [];
          },
          error: (error) => {
            console.error(error);
            alert(
              'Ocurrió un error al crear la propuesta. Por favor, intente nuevamente.'
            );
          },
        });
    } else {
      alert(
        'La propuesta debe contener al menos 2 actividades. Por favor, vuelva a intentarlo.'
      );
    }
  }

  /**
   * Método para seleccionar una actividad
   * @param activity - Actividad seleccionada
   */
  selectActivity(activity: IActivity) {
    if (activity) {
      // Agrega la actividad al arreglo de actividades seleccionadas
      this.selectedActivities.push(activity);
      // Actualiza la lista de actividades después de seleccionar una
      this.getActivities();
    }
  }

  /**
   * Método para obtener las actividades seleccionadas
   * @returns Arreglo de actividades seleccionadas
   */
  getActivities(): IActivity[] {
    return this.selectedActivities;
  }

  /**
   * Método para iniciar un juego con la propuesta creada
   */
  startGame(): void {
    if (this.proposal) {
      // Llamada al servicio para crear un nuevo juego con la propuesta
      this.gameService
        .createGame(this.proposal)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert(
              'Ocurrió un error al crear la sesión de juego. Por favor, intente nuevamente.'
            );
            throw error;
          })
        )
        .subscribe({
          next: (response: IGame) => {
            console.log(response);
            alert('Sesión de juego creada con éxito!');
          },
          error: (error) => {
            console.error(error);
            alert(
              'Ocurrió un error al crear la sesión de juego. Por favor, intente nuevamente.'
            );
          },
        });
    } else {
      alert('Primero debes crear una propuesta. Vuelva a intentarlo.');
    }
  }
}
