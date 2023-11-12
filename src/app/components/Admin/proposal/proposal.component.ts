import { Component } from '@angular/core';
import { IActivity } from '../activities/IActivity';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IProposal } from './IProposal';
import { IGame } from 'src/app/game';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getActivities();
    this.getSelectedActivities();
  }
  selectedActivities: IActivity[] = [];
  name!: string;
  id!: string;
  proposal?: IProposal;

  createProposal(name: string) {

    //CREAR BIEN LA PROPUESTA
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.name = name;
  }

  getProposal() {
    return this.proposal; // ojo, una cosa es una IProposal y otra es el Component
  }

  getActivities(): IActivity[] {
    return this.adminService.getActivities();
  }

  /*getFirstActivity(): IActivity {
    return this.adminService.getActivity(1);
  }*/

  getSelectedActivities(): IActivity[] {
    this.selectedActivities = this.adminService.selectedActivities;
    return this.selectedActivities;
  }

  startGame(): void {
    if (this.getActivities().length >= 2 || !this.id) {
      /* const game= {id: this.id, members: [], admin: , proposal: this.proposal} as IGame;
      this.adminService.startGame(game); */
    } else {
      alert('Debes añadir al menos dos o más actividades para comenzar el juego');
    }
  }
}
