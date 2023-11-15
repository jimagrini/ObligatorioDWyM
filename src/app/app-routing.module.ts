import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Admin/login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { ProposalComponent } from './components/Admin/proposal/proposal.component';
import { RegisterComponent } from './components/Admin/register/register.component';
import { GameComponent } from './components/Admin/game/game.component';
import { LobbyComponent } from './components/Admin/lobby/lobby.component';
import { ResultsComponent } from './components/Admin/results/results.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-room', component: ProposalComponent },
  { path: 'game', component: GameComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
