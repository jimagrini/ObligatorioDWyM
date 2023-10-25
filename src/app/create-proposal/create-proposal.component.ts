import { Component } from '@angular/core';
import { IActivity } from '../IActivity';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  constructor(private adminService: AdminService) {}

  addActivity(activity: IActivity): void {
    this.adminService.addActivity(activity);
  }

  showActivityForm = false;
  toggleActivityForm(): void {
    this.showActivityForm = !this.showActivityForm;
    const button = document.getElementById('form-button');
    if (this.showActivityForm) {
      button!.textContent = 'Ocultar Formulario';
    } else {
      button!.textContent = 'Agregar Actividad';
    }
  }
}
