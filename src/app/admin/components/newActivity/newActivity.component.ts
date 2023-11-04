import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';
import { IActivity, CATEGORIES } from '../../../activities/IActivity';

@Component({
  selector: 'app-newActivity',
  templateUrl: './newActivity.component.html',
  styleUrls: ['./newActivity.component.css']
})
export class NewActivityComponent {

  constructor(private adminService: AdminService) { }

  categories = CATEGORIES;

  @Output() activityAdded = new EventEmitter<IActivity>();

  model = { name: 'Futbol 5', category: 'Deportiva', description: 'Reserva de una cancha de futbol 5 por el total de 1 hora', image: new URL('https://artigasnoticias.com.uy/wp-content/uploads/2020/07/15885348365759.jpg') } as IActivity;

  submitted = false;

  onSubmit() { this.submitted = true; }

  newActivity(): void {
    const newPlayer = { name: this.model.name, category: this.model.category, description: this.model.description, image: this.model.image } as IActivity;
    this.activityAdded.emit(newPlayer);
    this.model = { name: 'Futbol 5', category: 'Deportiva', description: 'Reserva de una cancha de futbol 5 por el total de 1 hora', image: new URL('https://artigasnoticias.com.uy/wp-content/uploads/2020/07/15885348365759.jpg') } as IActivity;
    this.submitted = false;
  }
}
