import { Component } from '@angular/core';
import { IActivity } from './IActivity';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  selectedActivities: IActivity[] = [];

  constructor(private adminService: AdminService) { }

  getActivities(): IActivity[] {
    return this.adminService.getActivities()
  }

  getSelectedActivities(): IActivity[] {
    this.selectedActivities = this.adminService.selectedActivities;
    return this.selectedActivities;
  }

  selectActivity(activity: IActivity): void {
    this.adminService.selectActivity(activity);
    
  }

  createActivity(activity: IActivity): void {
    this.adminService.createActivity(activity);
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
