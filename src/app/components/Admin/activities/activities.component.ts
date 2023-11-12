import { Component } from '@angular/core';
import { IActivity } from './IActivity';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  activities: IActivity[] = [];


  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.activitiesService.getActivities()
    .subscribe(activities => this.activities = activities); 
  }

  selectActivity(activity: IActivity): void {
    this.activitiesService.selectActivity(activity);
  }

  add(name: string, category: string, description: string, image: URL): void {
    category= category.trim()
    description= description.trim()
    name = name.trim();
    if (!name) { return; }
    this.activitiesService.createActivity({ name, category, description, image } as IActivity)
      .subscribe(activities => {
        this.activities.push(activities);
      });  
    }

    delete(activity: IActivity){
      this.activities = this.activities.filter(h => h !== activity);
      this.activitiesService.deleteActivity(activity.id).subscribe();
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
