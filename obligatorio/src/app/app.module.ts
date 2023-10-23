import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ActivityComponent } from './activity/activity.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { SelectActivityComponent } from './select-activity/select-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    ProposalComponent,
    ActivityComponent,
    CreateActivityComponent,
    CreateProposalComponent,
    SelectProposalComponent,
    SelectActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
