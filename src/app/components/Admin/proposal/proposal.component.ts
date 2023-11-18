import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { IProposal } from '../../../interfaces/proposal';
import { ProposalService } from '../../../services/proposal.service';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/game';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {

  @Output() proposalAdded = new EventEmitter<IProposal>();
  @Input() selectedActivities: IActivity[] = []
  proposal?: IProposal;

  constructor(private proposalService: ProposalService, private gameService: GameService) { }

  ngOnInit() {
    this.getActivities();
  }

  /**
   * 
   * @param id - admin id
   * @param name 
   */
  createProposal(name: string): void {
    if (this.selectedActivities.length >= 2 && name) {
      this.proposalService.add(name, this.selectedActivities)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Ocurrió un error al crear la propuesta. Por favor, intente nuevamente.');
            throw error;
          })
        ).subscribe({
          next: (response: IProposal) => {
            console.log(response)
            alert('Propuesta creada con éxito!');
            this.selectedActivities.forEach(act => act.selected = false);
            this.selectedActivities = [];
          },
          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al crear la propuesta. Por favor, intente nuevamente.');
          }
        });
    } else {
      alert("La propuesta debe contener al menos 2 actividades. Por favor, vuelva a intentarlo.")
    }
  }

  selectActivity(activity: IActivity) {
    if (activity) {
      this.selectedActivities.push(activity);
      this.getActivities();
    }
  }

  getActivities(): IActivity[] {
    return this.selectedActivities;
  }

  startGame(): void {
    if (this.proposal) {
      this.gameService.createGame(this.proposal)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Ocurrió un error al crear la sesion de juego. Por favor, intente nuevamente.');
            throw error;
          })
        ).subscribe({
          next: (response: IGame) => {
            console.log(response)
            alert('Sesion de juego creada con éxito!');
          },
          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al crear la sesion de juego. Por favor, intente nuevamente.');
          }
        });
    } else {
      alert("Primero debes crear una propuesta. Vuelva a intentarlo.")
    }
  }
}
