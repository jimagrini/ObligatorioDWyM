import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { SelectActivityComponent } from './select-activity/select-activity.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';

const routes: Routes = [
  { path: 'select-proposal', component: SelectProposalComponent },
  { path: 'select-activity', component: SelectActivityComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'create-activity', component: CreateActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }