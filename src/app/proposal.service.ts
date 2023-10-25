import { Injectable } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { Actividad } from './activity.module';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor() { }

  getActivities() : Actividad[] {
    const activities = ACTIVITIES;
    return activities;
  }

  getActivity(id: number): Actividad {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next Ac of the tutorial.
    const activity = ACTIVITIES.find(act => act.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    return activity;
  }
}
