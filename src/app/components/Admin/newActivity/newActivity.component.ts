import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../admin.service';
import { IActivity } from '../activities/IActivity';
import { CATEGORIES } from 'src/app/constants';

@Component({
  selector: 'app-newActivity',
  templateUrl: './newActivity.component.html',
  styleUrls: ['./newActivity.component.css']
})
export class NewActivityComponent {

  constructor(private adminService: AdminService) { }

  categories = CATEGORIES;

  @Output() activityAdded = new EventEmitter<IActivity>();

  model = { name: 'Nombre Actividad', category: 'Tipo de Actividad', description: 'Descripcion de la actividad', image: new URL('https://cdn-icons-png.flaticon.com/512/271/271215.png') } as IActivity;

  submitted = false;

  onSubmit() { this.submitted = true; }

  newActivity(): void {
    const newPlayer = { name: this.model.name, category: this.model.category, description: this.model.description, image: this.model.image } as IActivity;
    this.activityAdded.emit(newPlayer);
    alert('Actividad creada con exito!');
    this.model = { name: 'Nombre Actividad', category: 'Tipo de actividad', description: 'Descripcion de la actividad', image: new URL('https://cdn-icons-png.flaticon.com/512/271/271215.png') } as IActivity;
    this.submitted = false;
  }
}
