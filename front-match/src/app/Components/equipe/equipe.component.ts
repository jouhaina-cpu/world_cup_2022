import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipeEntity } from 'src/app/Models/equipe';
import { EquipeService } from 'src/app/Services/equipe.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})


export class EquipeComponent implements OnInit {
  Image: any;
  equipes: any;
  editEquipe: any;
  deleteEquipe: any;
  profileEquipe: any;
  selectedFile: any;
  httpClient: any;
  public isAdmin!:boolean;

  constructor(private toastr: ToastrService, private equipeService: EquipeService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getEquipe();
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

  public getEquipe(): void {
    this.equipeService.getEquipeEntity().subscribe((response: EquipeEntity[]) => {
      this.equipes = response;
      console.log(response);
    },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      });
  }

  public onAddEquipe(addForm: NgForm): void{
    document.getElementById('add-ref-form')?.click();
    console.log(addForm.value);
    this.equipeService.addEquipeEntity(addForm.value).subscribe(
      async (response: any) => {
        console.log(response);
        window.location.reload();

      }, (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public OnDeleteRef(equipeName: string): void{
    this.equipeService.deleteEquipeEntity(equipeName).subscribe(
      async (response: any) => {
        console.log(response);
        this.showToasterSuccess('Equipe deleted successfully!');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public onUpdateRef(equipe: EquipeEntity): void{
    document.getElementById('add-ref-form')?.click();
    this.equipeService.updateEquipeEntity(equipe, equipe.nomequipe).subscribe(
      async (response: any) => {
        console.log(response);
         window.location.reload();
        
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public onOpenModal(equipe: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addRefModal');
    }
    if (mode === 'edit'){
      this.editEquipe = equipe;
      button.setAttribute('data-target', '#editRefModal');
    }
    if (mode === 'delete'){
      this.deleteEquipe = equipe;
      button.setAttribute('data-target', '#deleteRefModal');
    }
    if (mode === 'profile'){
      equipe.image = equipe.image;
      this.profileEquipe = equipe;
      console.log('***************');
      console.log(this.profileEquipe);
      button.setAttribute('data-target', '#profileRefModal');
    }
    container?.appendChild(button);
    button.click();
  }


}

