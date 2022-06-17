import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArbitreEntity } from 'src/app/Models/arbitre';
import { ArbitreService } from 'src/app/Services/arbitre.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-arbitre',
  templateUrl: './arbitre.component.html',
  styleUrls: ['./arbitre.component.css']
})


export class ArbitreComponent implements OnInit {
  Image: any;
  arbitres: any;
  editArbitre: any;
  deleteArbitre: any;
  profileArbitre: any;
  selectedFile: any;
  httpClient: any;
  public isAdmin!:boolean;

  constructor(private toastr: ToastrService, private arbitreService: ArbitreService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.getArbitre();
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

  public getArbitre(): void {
    this.arbitreService.getArbitreEntity().subscribe((response: ArbitreEntity[]) => {
      this.arbitres = response;
      console.log(response);
    },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      });
  }

  public onAddArbitre(addForm: NgForm): void{
    document.getElementById('add-ref-form')?.click();
    console.log(addForm.value);
    this.arbitreService.addArbitreEntity(addForm.value).subscribe(
      async (response: any) => {
        console.log(response);
        window.location.reload();

      }, (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public OnDeleteRef(arbitreName: string): void{
    this.arbitreService.deleteArbitreEntity(arbitreName).subscribe(
      async (response: any) => {
        console.log(response);
        this.showToasterSuccess('Arbitre deleted successfully!');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public onUpdateRef(arbitre: ArbitreEntity): void{
    document.getElementById('add-ref-form')?.click();
    this.arbitreService.updateArbitreEntity(arbitre, arbitre.nomarbitre).subscribe(
      async (response: any) => {
        console.log(response);
         window.location.reload();
        
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public onOpenModal(arbitre: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addRefModal');
    }
    if (mode === 'edit'){
      this.editArbitre = arbitre;
      button.setAttribute('data-target', '#editRefModal');
    }
    if (mode === 'delete'){
      this.deleteArbitre = arbitre;
      button.setAttribute('data-target', '#deleteRefModal');
    }
    if (mode === 'profile'){
      arbitre.image = arbitre.image;
      this.profileArbitre = arbitre;
      console.log('***************');
      console.log(this.profileArbitre);
      button.setAttribute('data-target', '#profileRefModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

