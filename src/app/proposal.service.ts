import { Injectable } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { IActivity } from './IActivity';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor() { }

  getActivities() : IActivity[] {
    const activities = ACTIVITIES;
    return activities;
  }

  getActivity(id: number): IActivity {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next Ac of the tutorial.
    const activity = ACTIVITIES.find(act => act.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    return activity;
  }

  createActivity(activity: IActivity): void {
    if (activity) {
      ACTIVITIES.push(activity);
    }
  }
}
