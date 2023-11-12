import { Component } from '@angular/core';
import { IActivity } from '../activities/IActivity';
import { Router } from '@angular/router';
import { ActivitiesService } from '../activities/activities.service';
import { IProposal } from './IProposal';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {
  constructor(
    private router: Router,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    this.getActivities();
  }
  selectedActivities: IActivity[] = [];
  name!: string;
  id!: string;
  proposal?: IProposal;

  createProposal(name: string) {

    //CREAR BIEN LA PROPUESTA y asignarla a this.proposal
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.name = name;
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
