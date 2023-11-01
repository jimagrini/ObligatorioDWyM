import { Component } from '@angular/core';
import { IActivity } from './IActivity';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  selectedActivities: IActivity[] = [];

  constructor(private activityService: ActivityService) { }

  getActivities(): IActivity[] {
    return this.activityService.getActivities()
  }

  getSelectedActivities(): IActivity[] {
    this.selectedActivities = this.activityService.selectedActivities;
    return this.selectedActivities;
  }

  selectActivity(activity: IActivity): void {
    this.activityService.selectActivity(activity);
    
  }

  createActivity(activity: IActivity): void {
    this.activityService.createActivity(activity);
  }

  showNewActivityForm = false;

  toggleActivityForm(): void {
    this.showNewActivityForm = !this.showNewActivityForm;
    const button = document.getElementById('form-button');
    if (this.showNewActivityForm) {
      button!.textContent = 'Ocultar Formulario';
    } else {
      button!.textContent = 'Agregar Actividad';
    }
  }
}
