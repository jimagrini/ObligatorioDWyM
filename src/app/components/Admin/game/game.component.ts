import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../activities/IActivity';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  activities: IActivity[] = [];
  currentActivity: IActivity | null = null;
  votes: { [activityId: string]: number } = {};
  showResults = false;

  constructor(private route: ActivatedRoute, adminService: AdminService) {}

  startGame(): void {
    this.showResults = false;
    this.votes = {};
    this.showNextActivity();
  }

  showNextActivity(): void {
    if (this.currentActivity) {
      setTimeout(() => {

        /* implementar votaciones */

        const index = this.activities.indexOf(this.currentActivity!) + 1;
        if (index < this.activities.length) {
          this.currentActivity = this.activities[index];
          this.showNextActivity();
        } else {
          this.showResults= true;
          // navigate to new page
        }
      }, 10000); 
    }
  }
}