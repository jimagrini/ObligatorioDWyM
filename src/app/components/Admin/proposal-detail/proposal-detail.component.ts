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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProposal(id);
    }
  }

  async getProposal(id: string): Promise<void> {
    this.proposalService.getProposal(id).subscribe(
      (proposal: IProposal) => {
        this.proposal = proposal;
      },
      (error) => {
        console.error(`Error fetching proposal: ${id}`, error);
      }
    );
  }

  async createGame(){
    this.gameService.createGame(this.proposal!)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('Ocurrió un error al crear la sesion de juego. Por favor, intenta nuevamente.');
          throw error;
        })
      )
      .subscribe({
        next: (response: IGame) => {
          console.log(response);
          alert('Sesion de juego creada con éxito!');
          this.router.navigate(['/games', response._id, 'lobby']);
        },
        error: (error) => {
          console.error(error);
          alert('Ocurrió un error al crear la sesion de juego Por favor, intenta nuevamente.');
        }
      });
  }

  goBack(){
    this.router.navigate(['/proposals']);
  }
}
