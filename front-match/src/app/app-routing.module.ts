import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { MatchComponent } from './Components/match/match.component';
import { EquipeComponent } from './Components/equipe/equipe.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ArbitreComponent } from './Components/arbitre/arbitre.component';
import { TournoisComponent } from './Components/tournois/tournois.component';
import { StaffComponent } from './Components/staff/staff.component';


const routes: Routes = [
  {path:'users',component:UsersListComponent},
  {path:'match',component:MatchComponent},
  {path:'equipe',component:EquipeComponent},
  {path:"arbitre",component:ArbitreComponent},
  {path:"tournois",component:TournoisComponent},
  {path:"staff",component:StaffComponent},
  {path:'',component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
