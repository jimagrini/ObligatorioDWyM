import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../../../interfaces/activity';
import { AdminService } from '../../../services/admin.service';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  activities: IActivity[] = [];
  currentActivity: IActivity | null = null;
  votes: { [activityId: string]: number } = {};
  showResults = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private socketService: WebSocketService
  ) {}

  ngOnInit() {
    this.socketService.getNewMessage().subscribe((activityPart: IActivity) => {
      console.log(activityPart);
      this.currentActivity = activityPart;
    });
  }

  startGame(): void {
    this.showResults = false;
    this.votes = {};
    this.showNextActivity();
    this.socketService.sendMessage({ activities: this.activities });
  }

  showNextActivity(): void {
    if (this.currentActivity) {
      setTimeout(() => {
        const index = this.activities.findIndex((activity) => activity.id === this.currentActivity!.id) + 1;
        if (index < this.activities.length) {
          this.currentActivity = this.activities[index];
          this.showNextActivity();
        } else {
          this.showResults = true;
        }
      }, 10000);
    }
  }
}