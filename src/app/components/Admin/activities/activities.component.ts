import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActivity } from './IActivity';
import { ActivitiesService } from './activities.service';
import { IAdmin } from '../IAdmin';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {

  @Input() admin: IAdmin | null = null;
  @Output() activityAdded = new EventEmitter<IActivity>();
  selectedActivities: IActivity[] = [];
  activities: IActivity[] = [];

  constructor(private activitiesService: ActivitiesService) { }

  
  async getActivities(): Promise<void> {
    try {
      this.activitiesService.getActivities().subscribe((activities: IActivity[]) => {
        this.activities = activities || [];
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  getSelectedActivities(): IActivity[] {
    return this.selectedActivities;
  }

  selectActivity(activity: IActivity): void {
    if(this.selectedActivities && this.admin){
      this.selectedActivities.push(activity)
    }
  }

  /** Create a new activity
   * 
   * @param name 
   * @param category 
   * @param description 
   * @param image 
   */
  createActivity(activity: IActivity): void {
    this.activitiesService.add(activity.name, activity.category, activity.description, activity.image)
      .subscribe(() => {
        // Handle success if needed
      }, (error) => {
        console.error('Error creating activity:', error);
      });
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
