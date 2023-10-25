import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { SelectActivityComponent } from './select-activity/select-activity.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'select-proposal', component: SelectProposalComponent },
  { path: 'select-activity', component: SelectActivityComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'create-activity', component: CreateActivityComponent },
  { path: 'game/:gameUrl', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
