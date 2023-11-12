import { Injectable } from '@angular/core';
import { ACTIVITIES } from 'src/app/constants';
import { IActivity } from './IActivity';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  
  selectedActivities: IActivity[] = [];

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

  deleteActivity(id : number): void{
    ACTIVITIES.forEach((element,index)=>{
      if(element.id==id) ACTIVITIES.splice(index,1);
   });
  }
}
