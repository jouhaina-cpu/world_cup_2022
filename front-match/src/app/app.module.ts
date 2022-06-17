import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { RolesListComponent } from './Components/roles-list/roles-list.component';
import { UserService } from './Services/user.service';

import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { UserloginComponent } from './Components/userlogin/userlogin.component';
import { SpectatorComponent } from './Components/spectator/spectator.component';
import { MatchComponent } from './Components/match/match.component';
import { TicketComponent } from './Components/ticket/ticket.component';
import { RefComponent } from './Components/ref/ref.component';
import { SignupComponent } from './Components/signup/signup.component';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipeComponent } from './Components/equipe/equipe.component';
import { ArbitreComponent } from './Components/arbitre/arbitre.component';
import { TournoisComponent } from './Components/tournois/tournois.component';
import { StaffComponent } from './Components/staff/staff.component';

@NgModule({
  declarations: [
    AppComponent,

    UsersListComponent,
    SidebarComponent,
    UserloginComponent,
    RolesListComponent,
    SpectatorComponent,
    MatchComponent,
    TicketComponent,
    RefComponent,
    SignupComponent,
    EquipeComponent,
    ArbitreComponent,
    TournoisComponent,
    StaffComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true,
      positionClass: 'toast-bottom-center',
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
