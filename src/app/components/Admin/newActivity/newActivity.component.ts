import { Component, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { CATEGORIES } from 'src/app/constants';
import { ActivitiesService } from '../../../services/activities.service';

@Component({
  selector: 'app-newActivity',
  templateUrl: './newActivity.component.html',
  styleUrls: ['./newActivity.component.css'],
})
export class NewActivityComponent {
  constructor(private activitiesService: ActivitiesService) {}

  // Lista de categorías para la actividad
  categories = CATEGORIES;

  // Evento de salida que emite una nueva actividad
  @Output() activityAdded = new EventEmitter<IActivity>();

  // Modelo de actividad con valores predeterminados
  model = {
    name: 'Nombre Actividad',
    category: 'Tipo de Actividad',
    description: 'Descripcion de la actividad',
    image: 'https://cdn-icons-png.flaticon.com/512/271/271215.png',
  } as IActivity;

  // Bandera para rastrear si el formulario ha sido enviado
  submitted = false;

  // Método que se llama cuando se envía el formulario
  onSubmit() {
    this.submitted = true;
  }

  /** Emite una nueva actividad con los valores del formulario.
   *
   */
  newActivity(): void {
    // Verifica que los campos requeridos estén llenos
    if (
      this.model.name &&
      this.model.category &&
      this.model.description &&
      this.model.image
    ) {
      // Emite el evento activityAdded con la nueva actividad
      this.activityAdded.emit(this.model);
      // Reinicia el modelo con valores predeterminados
      this.model = {
        name: 'Nombre Actividad',
        category: 'Tipo de actividad',
        description: 'Descripción de la actividad',
        image: 'https://cdn-icons-png.flaticon.com/512/271/271215.png',
      } as IActivity;
      // Reinicia la bandera de envío del formulario
      this.submitted = false;
    }
  }
}
