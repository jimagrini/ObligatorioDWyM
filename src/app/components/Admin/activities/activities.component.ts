import { Component, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { ActivitiesService } from '../../../services/activities.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {

  @Output() selectedActivity= new EventEmitter<IActivity>();
  selectedActivities: IActivity[] = [];
  activities: IActivity[] = [];

  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit(){
    this.getActivities();
  }

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
    if (activity) {
      this.selectedActivities.push(activity);
      activity.selected = !activity.selected;
      this.selectedActivity.emit(activity);
    }
  }


  /** Create new activity
   * 
   * @param activity 
   */
  async createActivity(activity: IActivity) {
    this.activitiesService.add(activity.name, activity.category, activity.description, activity.image)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('Ocurrió un error al crear la actividad. Por favor, intenta nuevamente.');
          throw error;
        })
      )
      .subscribe({
        next: (response: IActivity) => {
          console.log(response);
          alert('Actividad creada con éxito!');
          this.getActivities();
        },
        error: (error) => {
          console.error(error);
          alert('Ocurrió un error al crear la actividad. Por favor, intenta nuevamente.');
        }
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
