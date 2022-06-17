import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  role: any;
  roleId: any;
  userId: any;
  users: User[] = [];
  roles: Role[] = [];
  rolesToAdd: Role[] = [];
  rolesToUpdate: Role[] = [];
  profileUser: any;
  editUser!: User;
  deleteUser: any;

  constructor(private toastr: ToastrService, private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      if (!this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')){
        this.router.navigate(['/match']).then(() => {
          window.location.reload();
        });
      }
      this.getUsers();
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

  public getUsers(): void {
    this.userService.getUsers().subscribe((response: User[]) => {
      this.users=response;
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
    console.log(this.users);
  }

  public OnUpdateUser(user: User): void{
    document.getElementById('add-user-form')?.click();
    this.rolesToUpdate = user.roles;
    console.log('***********************' + user);
    this.userService.updateUser(user, user.id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    window.location.reload();

  }


  public OnDeleteUser(userId: number): void{
    this.userService.deleteUser(userId).subscribe(
      (response: any) => {
        console.log(response);
        this.showToasterSuccess('User deleted successfully!');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
       this.showToasterError(error.message);
      }
    );
  }

  public onOpenModal(user: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit'){
      this.editUser = user;
      button.setAttribute('data-target', '#editUserModal');
    }
    if (mode === 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    if (mode === 'profile'){
      this.profileUser = user;
      console.log('***************');
      console.log(this.profileUser);
      button.setAttribute('data-target', '#profileUserModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
