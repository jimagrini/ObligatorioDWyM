import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewActivityComponent } from './newActivity/newActivity.component';
import { ProposalComponent } from './proposal/proposal.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './register/register.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ResultsComponent } from './results/results.component';
import { LobbyComponent } from './lobby/lobby.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ActivitiesComponent,
    ProposalComponent,
    GameComponent,
    RegisterComponent,
    NewActivityComponent,
    ResultsComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
