import { Component } from '@angular/core';
import { IActivity } from '../activity/IActivity';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent {
  constructor(private route: ActivatedRoute, private proposalService : ProposalService) { }

  proposal: IActivity[] = []; 

  minimal = false;
  
  name!: string;
  

  createProposal(name : string){
    this.name = name;
  }

  changeStatus(){
    this.minimal = true;
  }

  getProposal(){
    return this.proposal;
  }

  getActivities(): IActivity[] {
    return this.proposalService.getActivities()
  }

  addActivity(id : number){
    const act = this.selectedActivity;
    if(this.getActivities().length>=2){
      this.changeStatus();
    }
    if(act){
      this.proposal.push(act);
    }else{
      console.log("Actividad inexistente")
    }
  }
  
  closeProposal(){
    if(this.minimal){
      console.log("propuesta cerrada");
    }else{
      console.log("Debes añadir al menos dos o más activdades para cerrar la propuesta")
    }
  }

  selectedActivity?: IActivity;
    onSelect(activity: IActivity) : void {
      this.selectedActivity = activity;
    }

  createActivity(activity: IActivity): void {
    this.proposalService.createActivity(activity);
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
