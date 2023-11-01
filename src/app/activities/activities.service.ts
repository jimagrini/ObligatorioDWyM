import { Injectable } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { IActivity } from './IActivity';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  
  selectedActivities: IActivity[] = [];
  constructor() { }

  getActivities() : IActivity[] {
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
}
