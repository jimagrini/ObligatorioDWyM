import { Injectable } from '@angular/core';
import { ProposalComponent } from './proposal.component';
import { IProposal } from './IProposal';
import { PROPOSALS } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor() { 

  }
  
  selectedPROPOSALS: IProposal[] = [];

  getPROPOSALS() : IProposal[] {
    return PROPOSALS;
  }

  getProposal(id: number): IProposal {
    return PROPOSALS.find(act => act.id === id)!;
  }

  createProposal(proposal: IProposal): void {
    if (proposal) {
      PROPOSALS.push(proposal);
    }
  }

  deleteProposal(id : number): void{
    PROPOSALS.forEach((element,index)=>{
      if(element.id==id) PROPOSALS.splice(index,1);
   });
  }
}

