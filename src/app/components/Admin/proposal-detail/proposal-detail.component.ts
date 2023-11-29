import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProposal } from 'src/app/interfaces/proposal';
import { GameService } from 'src/app/services/game.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { catchError } from 'rxjs';
import { IGame } from 'src/app/interfaces/game';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css']
})
export class ProposalDetailComponent {
  proposal?: IProposal;

  constructor(
    private router: Router,
    private proposalService: ProposalService,
    private route: ActivatedRoute, 
    private gameService: GameService
  ) {}

  // Se ejecuta al inicializar el componente.
  ngOnInit(): void {
    // Obtiene el identificador de la propuesta desde los parámetros de la URL.
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Obtiene y muestra los detalles de la propuesta.
      this.getProposal(id);
    }
  }

  // Obtiene y muestra los detalles de una propuesta utilizando su identificador.
  async getProposal(id: string): Promise<void> {
    // Utiliza el servicio ProposalService para obtener la propuesta.
    this.proposalService.getProposal(id).subscribe(
      (proposal: IProposal) => {
        // Al recibir la respuesta, actualiza la propiedad 'proposal' con los detalles de la propuesta.
        this.proposal = proposal;
      },
      (error) => {
        // Maneja cualquier error que ocurra durante la obtención de la propuesta.
        console.error(`Error fetching proposal: ${id}`, error);
      }
    );
  }

  // Crea un nuevo juego basado en la propuesta actual.
  async createGame(){
    // Utiliza el servicio GameService para crear un nuevo juego.
    this.gameService.createGame(this.proposal!)
      .pipe(
        catchError((error) => {
          // Maneja errores que puedan ocurrir durante la creación del juego.
          console.error(error);
          alert('Ocurrió un error al crear la sesión de juego. Por favor, intenta nuevamente.');
          throw error;
        })
      )
      .subscribe({
        next: (response: IGame) => {
          // Al recibir la respuesta, muestra un mensaje de éxito y navega a la pantalla de lobby del juego.
          console.log(response);
          alert('Sesión de juego creada con éxito!');
          this.router.navigate(['/games', response._id, 'lobby']);
        },
        error: (error) => {
          // Maneja cualquier error que ocurra después de la creación del juego.
          console.error(error);
          alert('Ocurrió un error al crear la sesión de juego. Por favor, intenta nuevamente.');
        }
      });
  }

  // Navega de nuevo a la lista de propuestas.
  goBack(){
    this.router.navigate(['/proposals']);
  }
}
