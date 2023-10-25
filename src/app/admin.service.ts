import { Injectable } from '@angular/core';
import { IActivity } from './IActivity';
import { ACTIVITIES } from './mock-activities';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  addActivity(activity: IActivity): void {
    if (activity) {
      ACTIVITIES.push(activity);
    }
  }
}
