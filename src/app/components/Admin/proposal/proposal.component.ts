import { Component } from '@angular/core';
import { IActivity } from '../activities/IActivity';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {
  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getActivities();
    this.getSelectedActivities();
  }
  selectedActivities: IActivity[] = [];
  name!: string;
  id!: string;

  createProposal(name: string) {

    //CREAR BIEN LA PROPUESTA
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.name = name;
  }

  getProposal() {
    return this;
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
      //start
      //count 3 seconds and redirect to game component
      this.router.navigate(['/game', this.id]);
    } else {
      alert(
        'Debes añadir al menos dos o más actividades para comenzar el juego'
      );
    }
  }
}
