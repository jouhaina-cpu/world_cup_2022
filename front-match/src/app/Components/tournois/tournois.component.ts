import { Component, OnInit } from '@angular/core';
import { MatchEntity } from 'src/app/Models/match';
import { TournoisEntity } from 'src/app/Models/tournois';
import { TournoisService } from 'src/app/Services/tournois.service';
import { MatchService } from 'src/app/Services/match.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchesToAdd } from 'src/app/Models/matchesToAdd';


@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css']
})

export class TournoisComponent implements OnInit {

  public tournois!: TournoisEntity[];
  public editTournoi!: TournoisEntity;
  public deleteTournoi!: TournoisEntity;
  public deleteMatchFromTournoi!: string;
  public deleteMatch!:MatchEntity;
  public isAdmin!:boolean;
  public matchs!:MatchEntity[];
  public ExistedMatchs!:MatchEntity[];
  public addMatchesToTournoi:MatchesToAdd={
    tournoiName:"",
    matchs : []
  };

  constructor(private tournoiService: TournoisService,private matchService: MatchService, private tokenStorageService: TokenStorageService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getTournois();
      this.getMatches();
      if(this.tokenStorageService.getUser().roles.includes("ROLE_ADMIN")){
        this.isAdmin=true;
      }
    }
    else{
          this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
    }
  }


  public showToasterSuccess = (msg: string) => {
    this.toastr.success(msg);
  }

  public showToasterError = (msg: string) => {
    this.toastr.error(msg);
  }
public getTournois(): void {
    this.tournoiService.getTournoiEntity().subscribe(
      (response: TournoisEntity[]) => {
        this.tournois = response;
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    }


    public getMatches(): void {
      this.matchService.getMatchEntity().subscribe(
        (response: MatchEntity[]) => {
          this.matchs = response;
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
        }
      );
      }

    public onAddTournoi(addForm: NgForm): void{
      document.getElementById('add-tournoi-form')?.click();
      addForm.value.resultat=addForm.value.resultat??"-";
      this.tournoiService.addTournoiEntity(addForm.value).subscribe(
        async (response: TournoisEntity) => {
          window.location.reload();

        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
          addForm.reset();
        }
      );
      this.tournoiService.getTournoiEntity().subscribe(
        (response: TournoisEntity[]) => {
          this.tournois = response;
          this.showToasterSuccess('Match added successfully!');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          this.showToasterError(error.message);
        }
      );
    }

    public onAddMatchToTournoi(addForm: NgForm): void{
      document.getElementById('add-match-form')?.click();
      for(let el in addForm.value){
        let t=el.split("_");
        if(addForm.value[el]){
          this.matchs.forEach(l=>{
            if(l.id.toString()==t[1]){
              this.addMatchesToTournoi.matchs.push(l);
            }
          });
        }
      }
      this.getMatches();
      this.tournoiService.addMatchToTournoiEntity(this.addMatchesToTournoi).subscribe(
        async (response: any) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
          addForm.reset();
        }
      );
      this.tournoiService.getTournoiEntity().subscribe(
        (response: TournoisEntity[]) => {
          this.tournois = response;
          this.showToasterSuccess('Match added successfully!');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          this.showToasterError(error.message);
        }
      );
    }
    
    public onDeleteTournoi(tournoi: TournoisEntity): void {
      console.log(tournoi)
      this.tournoiService.deleteTournoiEntity(tournoi.tournoi_title).subscribe(
        (response: void) => {
          console.log(response);
          this.getTournois();
          this.showToasterSuccess('Match deleted successfully!');
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
        }
      );
    }

    public onDeleteMatchFromTournoi(tournoi: TournoisEntity): void {
      console.log(tournoi)
      this.tournoiService.deleteMatchFromTournoiEntity(this.deleteMatchFromTournoi,this.deleteMatch.id).subscribe(
        (response: void) => {
          this.getTournois();
          this.showToasterSuccess('Match deleted successfully!');
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
        }
      );
    }

    public onUpdateTournoi(tournoi: TournoisEntity): void {
      this.tournoiService.updateTournoiEntity(tournoi, tournoi.tournoi_title).subscribe(
        (response: any) => {
          this.showToasterSuccess('Match updated successfully!');
          this.getTournois();
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);

        }
      );
    }

    public searchMatches(key: string): void {
      console.log(key);
      const results: TournoisEntity[] = [];
      for (const match of this.tournois) {
        if (match.tournoi_title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || match.tournoi_title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || match.status.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(match);
        }
      }
      this.tournois = results;
      if (results.length === 0 || !key) {
        this.getTournois();
      }
    }

    public onOpenModal(tournoi: any, mode: string,match:any=0): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'addtournoi') {
        button.setAttribute('data-target', '#addTournoiModal');
      }
      if (mode === 'addmatch') {
        this.ExistedMatchs=tournoi?.tournois_matchs;
        this.addMatchesToTournoi.tournoiName=tournoi?.tournoi_title;
        this.filter();
        button.setAttribute('data-target', '#addMatchModal');
      }
      if (mode === 'edit') {
      this.editTournoi = tournoi;
      button.setAttribute('data-target', '#updateMatchModal');
      }
      if (mode === 'deletetournoi') {
        this.deleteTournoi = tournoi;
        button.setAttribute('data-target', '#deleteTournoiModal');
       }
      if (mode === 'deletematch') {
       this.deleteMatchFromTournoi = tournoi.tournoi_title;
       this.deleteMatch=match;
       button.setAttribute('data-target', '#deleteMatchModal');
      }
      container?.appendChild(button);
      button.click();
    }

    private filter(){
      let tmp:MatchEntity[]=[];
      this.matchs?.forEach(el=>{
        if(!this.ExistedMatchs?.find(n=>n.id==el.id)){
          tmp.push(el);
        }
      });
      this.matchs=tmp;
    }
}
