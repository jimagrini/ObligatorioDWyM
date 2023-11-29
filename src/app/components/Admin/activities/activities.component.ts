import { Component, Output, EventEmitter } from '@angular/core';
import { IActivity } from '../../../interfaces/activity';
import { ActivitiesService } from '../../../services/activities.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent {
  // EventEmitter para emitir eventos cuando se selecciona una actividad
  @Output() selectedActivity = new EventEmitter<IActivity>();

  // Arreglo de actividades seleccionadas
  selectedActivities: IActivity[] = [];

  // Arreglo de todas las actividades
  activities: IActivity[] = [];

  constructor(private activitiesService: ActivitiesService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.getActivities();
  }

  // Método para obtener todas las actividades desde el servicio
  async getActivities(): Promise<void> {
    try {
      // Llamada al servicio para obtener las actividades
      this.activitiesService
        .getActivities()
        .subscribe((activities: IActivity[]) => {
          // Al recibir las actividades, se asignan al arreglo activities
          this.activities = activities || [];
        });
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  // Método para obtener las actividades seleccionadas
  getSelectedActivities(): IActivity[] {
    return this.selectedActivities;
  }

  // Método para seleccionar una actividad
  selectActivity(activity: IActivity): void {
    if (activity) {
      // Agrega la actividad al arreglo de actividades seleccionadas
      this.selectedActivities.push(activity);
      // Cambia el estado de la propiedad 'selected' de la actividad
      activity.selected = !activity.selected;
      // Emite el evento indicando que se seleccionó una actividad
      this.selectedActivity.emit(activity);
    }
  }

  /**
   * Método para crear una nueva actividad
   * @param activity Objeto de actividad a crear
   */
  async createActivity(activity: IActivity) {
    // Llamada al servicio para agregar una nueva actividad
    this.activitiesService
      .add(
        activity.name,
        activity.category,
        activity.description,
        activity.image
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          alert(
            'Ocurrió un error al crear la actividad. Por favor, intenta nuevamente.'
          );
          throw error;
        })
      )
      .subscribe({
        next: (response: IActivity) => {
          console.log(response);
          alert('Actividad creada con éxito!');
          // Actualiza la lista de actividades después de crear una nueva
          this.getActivities();
        },
        error: (error) => {
          console.error(error);
          alert(
            'Ocurrió un error al crear la actividad. Por favor, intenta nuevamente.'
          );
        },
      });
  }

  // Variable para controlar la visibilidad del formulario de nueva actividad
  showNewActivityForm = false;

  // Método para alternar la visibilidad del formulario de nueva actividad
  toggleActivityForm(): void {
    this.showNewActivityForm = !this.showNewActivityForm;
    // Actualiza el texto del botón según la visibilidad del formulario
    const button = document.getElementById('form-button');
    if (this.showNewActivityForm) {
      button!.textContent = 'Ocultar Formulario';
    } else {
      button!.textContent = 'Agregar Actividad';
    }
  }
}
