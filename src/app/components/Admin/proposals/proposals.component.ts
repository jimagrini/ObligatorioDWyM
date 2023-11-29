import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProposal } from 'src/app/interfaces/proposal';
import { ProposalService } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent {

  // Lista de propuestas que se mostrará en el componente.
  proposals: IProposal[] = [];

  constructor(private router: Router, private proposalService: ProposalService) { }

  // Se ejecuta al inicializar el componente.
  ngOnInit() {
    // Obtiene y muestra la lista de propuestas al cargar el componente.
    this.getProposals();
  }

  // Obtiene la lista de propuestas desde el servicio ProposalService.
  getProposals(): void {
    try {
      // Utiliza el servicio para obtener la lista de propuestas.
      this.proposalService.getProposals().subscribe((proposals: IProposal[]) => {
        // Al recibir la respuesta, actualiza la propiedad 'proposals' con la lista de propuestas.
        this.proposals = proposals || [];
      });
    } catch (error) {
      // Maneja cualquier error que ocurra durante la obtención de las propuestas.
      console.error('Error fetching proposals:', error);
    }
  }

  // Navega a la página de detalles de una propuesta específica.
  seeDetails(proposal: IProposal) {
    // Muestra en la consola el identificador y el nombre de la propuesta seleccionada.
    console.log(proposal._id);
    console.log(proposal.name);
    
    // Navega a la página de detalles de la propuesta utilizando el identificador en la URL.
    this.router.navigate(['/proposals', proposal._id]);
  }
}
