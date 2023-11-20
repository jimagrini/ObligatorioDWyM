import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProposal } from 'src/app/interfaces/proposal';
import { ProposalService } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent {

  proposals: IProposal[] = [];

  constructor(private router: Router, private proposalService: ProposalService) { }

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

  seeDetails(proposal: IProposal) {
    console.log(proposal._id);
    console.log(proposal.name);
    this.router.navigate(['/proposals', proposal._id]);
  }
}
