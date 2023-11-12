import { Injectable } from '@angular/core';
import { IAdmin } from './IAdmin';
import { IActivity } from './activities/IActivity';
import { ADMINISTRATORS, ACTIVITIES, GAMES } from 'src/app/constants';
import { Router } from 'express';
import { IGame } from 'src/app/game';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }

  getAdmins(): IAdmin[] {
    const admins = ADMINISTRATORS;
    return admins;
  }

  getAdmin(id: number): IAdmin {
    const admin = ADMINISTRATORS.find(adm => adm.id === id)!;
    return admin;
  }

  addAdmin(admin: IAdmin): void {
    if (admin) {
      ADMINISTRATORS.push(admin);
    }
  }

  /**
   * ACTIVITIES
   */
  selectedActivities: IActivity[] = [];

  getActivities(): IActivity[] {
    return ACTIVITIES;
  }

  getActivity(id: number): IActivity {
    return ACTIVITIES.find(act => act.id === id)!;
  }

  selectActivity(activity: IActivity) {
    activity.selected = !activity.selected;
    if (!activity.selected) {
      this.selectedActivities.splice(
        this.selectedActivities.indexOf(activity),
        1
      );
    } else {
      this.selectedActivities.push(activity);
    }
  }

  createActivity(activity: IActivity): void {
    if (activity) {
      ACTIVITIES.push(activity);
    }
  }

// GAME SESSIONS

  startGame(game: IGame) {
    if(game){
      GAMES.push(game)
      //this.router.navigate(['/game', id]);
    }
  }

  getGame(id: number){
    const game= GAMES.find(game => game.id===id) as IGame;
    return game;
  }

}
