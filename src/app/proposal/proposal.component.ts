import { Component } from '@angular/core';
import { IActivity } from '../activity/IActivity';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { ActivityService } from '../activity/activity.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent {
  constructor(
    private router: Router,
    private activityService: ActivityService
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
    return this.activityService.getActivities();
  }

  /*getFirstActivity(): IActivity {
    return this.activityService.getActivity(1);
  }*/

  getSelectedActivities(): IActivity[] {
    this.selectedActivities = this.activityService.selectedActivities;
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
