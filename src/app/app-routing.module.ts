import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProposalComponent } from './admin/components/proposal/proposal.component';
import { RegisterComponent } from './admin/components/register/register.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './admin/components/lobby/lobby.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-room', component: ProposalComponent },
  { path: 'game', component: GameComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
