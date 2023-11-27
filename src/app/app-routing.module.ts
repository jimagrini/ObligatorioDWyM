import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Admin/login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { CreateProposalComponent } from './components/Admin/create-proposal/create-proposal.component';
import { RegisterComponent } from './components/Admin/register/register.component';
import { GameComponent } from './components/Admin/game/game.component';
import { LobbyComponent } from './components/Admin/lobby/lobby.component';
import { ResultsComponent } from './components/Admin/results/results.component';
import { ActivitiesComponent } from './components/Admin/activities/activities.component';
import { VoteComponent } from './components/User/vote/vote.component';
import { WaitingRoomComponent } from './components/User/waiting-room/waiting-room.component';
import { MenuComponent } from './components/Admin/menu/menu.component';
import { ProposalDetailComponent } from './components/Admin/proposal-detail/proposal-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'proposals/:id', component: ProposalDetailComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'games/:gameId/lobby', component: LobbyComponent },
  { path: 'games/:gameId/waiting-room', component: WaitingRoomComponent },
  { path: 'games/:gameId/results', component: ResultsComponent },
  { path: 'games/:gameId/activities', component: GameComponent },
  { path: 'games/:gameId/vote', component: VoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
