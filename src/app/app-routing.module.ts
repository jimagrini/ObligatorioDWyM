import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProposalComponent } from './proposal/proposal.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'proposal', component: ProposalComponent },
  { path: 'game', component: GameComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lobby', component: LobbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
