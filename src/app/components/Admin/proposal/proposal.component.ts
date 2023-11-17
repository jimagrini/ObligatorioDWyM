import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { IProposal } from '../../../interfaces/proposal';
import { ProposalService } from '../../../services/proposal.service';
import { AdminService } from '../../../services/admin.service';
import { IAdmin } from '../../../interfaces/admin';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {

  @Input() admin: IAdmin | null = null;
  @Output() proposalAdded = new EventEmitter<IProposal>();

  constructor(private adminService: AdminService, private proposalService: ProposalService) { }

  ngOnInit() {
    this.getActivities();
  }

  selectedActivities: IActivity[] = [];
  proposal?: IProposal;

  /**
   * 
   * @param id - admin id
   * @param name 
   */
  createProposal(name: string): void {
    if (this.admin && this.selectedActivities.length >= 2 && name) {
      this.proposalService.add(name, this.selectedActivities)
        .subscribe({
          next: (newProposal: IProposal) => {
            this.proposalAdded.emit(newProposal);
            alert('Propuesta creada con éxito!');
          },
          error: (error) => {
            console.error('Error creating proposal:', error);
          }
        });
    } else {
      alert("Error en la creacion de la propuesta. Vuelva a intentarlo.")
    }
  }

  getProposal() {
    return this.proposal;
  }

  getActivities(): IActivity[] {
    return this.selectedActivities;
  }

  /*getFirstActivity(): IActivity {
    return this.activitiesService.getActivity(1);
  }*/

  startGame(name: string): void {
    this.createProposal(name);
  }
}
