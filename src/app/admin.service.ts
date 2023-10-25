import { Injectable } from '@angular/core';
import { Activity } from './activity.module';
import { ACTIVITIES } from './mock-activities';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  addActivity(activity: Activity): void {
    if (activity) {
      ACTIVITIES.push(activity);
    }
  }
}
