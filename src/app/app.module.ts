import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { SelectActivityComponent } from './select-activity/select-activity.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateActivityComponent,
    CreateProposalComponent,
    SelectProposalComponent,
    SelectActivityComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
