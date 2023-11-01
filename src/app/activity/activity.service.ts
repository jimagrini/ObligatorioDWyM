import { Injectable } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { IActivity } from './IActivity';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  selectedActivities: IActivity[] = [];
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
}
