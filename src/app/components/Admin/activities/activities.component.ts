import { Component } from '@angular/core';
import { IActivity } from './IActivity';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  selectedActivities: IActivity[] = [];

  constructor(private activitiesService: ActivitiesService) { }

  getActivities(): IActivity[] {
    return this.activitiesService.getActivities()
  }

  getSelectedActivities(): IActivity[] {
    this.selectedActivities = this.activitiesService.selectedActivities;
    return this.selectedActivities;
  }

  selectActivity(activity: IActivity): void {
    this.activitiesService.selectActivity(activity);
    
  }

  createActivity(activity: IActivity): void {
    this.activitiesService.createActivity(activity);
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
