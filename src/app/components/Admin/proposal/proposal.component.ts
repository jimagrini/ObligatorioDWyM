import { Component } from '@angular/core';
import { IActivity } from '../activities/IActivity';
import { Router } from '@angular/router';
import { ActivitiesService } from '../activities/activities.service';
import { ProposalService } from './proposal.service';
import { IProposal } from './IProposal';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {
  constructor(
    private router: Router,
    private activitiesService: ActivitiesService, 
    private proposalService: ProposalService
  ) {}



  ngOnInit() {
    this.getProposals();
  }
  selectedActivities: IActivity[] = [];
  name!: string;
  id!: string;
  proposal?: IProposal;

  add(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.proposalService.createProposal({ name } as IProposal)
      .subscribe(proposal => {
        this.proposals.push(proposal);
      });
  }

  delete(proposal: IProposal){
    this.proposals = this.proposals.filter(h => h !== proposal);
    this.proposalService.deleteProposal(proposal.id).subscribe();
  }
  proposals: IProposal[] = [];


  getProposals() {
    this.proposalService.getPROPOSALS()
    .subscribe(proposal => this.proposals = proposal);
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

  startGame(): void {
    if (this.getActivities().length >= 2 || !this.id) {
      /* const game= {id: this.id, members: [], admin: , proposal: this.proposal} as IGame;
      this.adminService.startGame(game); */
    } else {
      alert('Debes añadir al menos dos o más actividades para comenzar el juego');
    }
  }
}
