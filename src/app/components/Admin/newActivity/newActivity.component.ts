import { Component, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../activities/IActivity';
import { CATEGORIES } from 'src/app/constants';
import { ActivitiesService } from '../activities/activities.service';

@Component({
  selector: 'app-newActivity',
  templateUrl: './newActivity.component.html',
  styleUrls: ['./newActivity.component.css']
})
export class NewActivityComponent {

  constructor(private activitiesService: ActivitiesService) { }

  categories = CATEGORIES;

  @Output() activityAdded = new EventEmitter<IActivity>();

  model = { name: 'Nombre Actividad', category: 'Tipo de Actividad', description: 'Descripcion de la actividad', image: new URL('https://cdn-icons-png.flaticon.com/512/271/271215.png') } as IActivity;

  submitted = false;
  onSubmit() { this.submitted = true; }

  /** Emits a new activity from the values contained in the form.
   * 
   */
  newActivity(): void {
    if (this.model.name && this.model.category && this.model.description && this.model.image) {
      this.activityAdded.emit(this.model);
      alert('Actividad creada con éxito!');
      this.model = { name: 'Nombre Actividad', category: 'Tipo de actividad', description: 'Descripción de la actividad', image: new URL('https://cdn-icons-png.flaticon.com/512/271/271215.png') } as IActivity;
      this.submitted = false;
    }
  }
}
