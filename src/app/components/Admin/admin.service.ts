import { Injectable } from '@angular/core';
import { IAdmin } from './IAdmin';
import { IActivity } from './activities/IActivity';
import { ADMINISTRATORS, ACTIVITIES, GAMES } from 'src/app/constants';
import { Router } from 'express';
import { IGame } from 'src/app/game';
import { ActivitiesService } from './activities/activities.service';
import { ProposalService } from './proposal/proposal.service';
import { IProposal } from './proposal/IProposal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private activitiesService: ActivitiesService, private proposalService: ProposalService) {

    this.proposalService = proposalService;
    this.activitiesService = activitiesService;
  }

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

  deleteActivity(id: number): void {
    this.activitiesService.deleteActivity(id);
  }

  createActivity(activity: IActivity): void {
    this.activitiesService.createActivity(activity);
  }

  deleteProposal(id: number): void {
    this.proposalService.deleteProposal(id);
  }

  createProposal(proposal: IProposal): void {
    this.proposalService.createProposal(proposal);
  }

  // GAME SESSIONS

  startGame(game: IGame) {
    if (game) {
      GAMES.push(game)
      //this.router.navigate(['/game', id]);
    }
  }

  getGame(id: number) {
    const game = GAMES.find(game => game.id === id) as IGame;
    return game;
  }

}
