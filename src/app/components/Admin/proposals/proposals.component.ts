import { Component } from '@angular/core';
import { IProposal } from 'src/app/interfaces/proposal';
import { ProposalService } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent {

  proposals: IProposal[] = [];

  constructor(private proposalService: ProposalService) { }

  ngOnInit() {
    this.getProposals();
  }

  getProposals(): void {
    try {
      this.proposalService.getProposals().subscribe((proposals: IProposal[]) => {
        this.proposals = proposals || [];
      });
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  }

  getProposal() {

  }
}
