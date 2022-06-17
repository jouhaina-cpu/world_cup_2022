import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from 'src/app/Models/staff';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { StaffService } from 'src/app/Services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffId: any;
  staffs: Staff[] = [];
  profileStaff: any;
  editStaff!: Staff;
  deleteStaff: any;
  public isAdmin!:boolean;

  constructor(private toastr: ToastrService, private staffService: StaffService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      if(this.tokenStorageService.getUser().roles.includes("ROLE_ADMIN")){
        this.isAdmin=true;
      }
      this.getStaffs();
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

  public getStaffs(): void {
    this.staffService.getStaffs().subscribe((response: Staff[]) => {
      this.staffs=response;
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
    console.log(this.staffs);
  }

  public OnAddStaff(addForm: NgForm): void{
    document.getElementById('add-ref-form')?.click();
    console.log(addForm.value);
    this.staffService.addStaff(addForm.value).subscribe(
      async (response: any) => {
        console.log(response);
        window.location.reload();

      }, (error: HttpErrorResponse) => {
        console.error(error.message);
        this.showToasterError(error.message);
      }
    );
  }

  public OnUpdateStaff(staff: Staff): void{
    document.getElementById('add-user-form')?.click();
    console.log('***********************' + staff);
    this.staffService.updateStaff(staff, staff.id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    window.location.reload();

  }


  public OnDeleteStaff(staffId: number): void{
    this.staffService.deleteStaff(staffId).subscribe(
      (response: any) => {
        console.log(response);
        this.showToasterSuccess('Staff deleted successfully!');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
       this.showToasterError(error.message);
      }
    );
  }

  public onOpenModal(staff: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addStaffModal');
    }
    if (mode === 'edit'){
      this.editStaff = staff;
      button.setAttribute('data-target', '#editStaffModal');
    }
    if (mode === 'delete'){
      this.deleteStaff = staff;
      button.setAttribute('data-target', '#deleteStaffModal');
    }
    if (mode === 'profile'){
      this.profileStaff = staff;
      button.setAttribute('data-target', '#profileStaffModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
