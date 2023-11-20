import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/Admin/login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { NewActivityComponent } from './components/Admin/newActivity/newActivity.component';
import { CreateProposalComponent } from './components/Admin/create-proposal/create-proposal.component';
import { GameComponent } from './components/Admin/game/game.component';
import { RegisterComponent } from './components/Admin/register/register.component';
import { ActivitiesComponent } from './components/Admin/activities/activities.component';
import { ResultsComponent } from './components/Admin/results/results.component';
import { LobbyComponent } from './components/Admin/lobby/lobby.component';
import { VoteComponent } from './components/User/vote/vote.component';
import { WaitingRoomComponent } from './components/User/waiting-room/waiting-room.component';
import { MenuComponent } from './components/Admin/menu/menu.component';
import { ProposalsComponent } from './components/Admin/proposals/proposals.component';
import { JwtInterceptor } from './components/Admin/interceptor/jwtInterceptor';
import { ProposalDetailComponent } from './components/Admin/proposal-detail/proposal-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ActivitiesComponent,
    CreateProposalComponent,
    GameComponent,
    RegisterComponent,
    NewActivityComponent,
    ResultsComponent,
    LobbyComponent,
    VoteComponent,
    WaitingRoomComponent,
    ProposalsComponent,
    MenuComponent,
    ProposalDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
