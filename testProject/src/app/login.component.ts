import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user.model';
import { UserService } from './shared/services/user.service';
import { UserTrackerError } from './shared/models/userTrackerError.model';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})


export class LoginComponent {
  
  username:string;
  password:string;
  error:UserTrackerError;

  user: User ={
    Username:undefined,
    Email:undefined,
    Password:undefined
  }

    constructor(private userService:UserService, private popup: MatSnackBar) {}

    login(){
  
      this.userService.getUserByUsernameAndPassword(this.username, this.password)
        .subscribe(
          (data:User)=>this.user=data,
          (err:UserTrackerError)=> this.error=err,                      
          ()=>{this.error=undefined,
            this.popup.open("the user was logged in!", "", {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: "pop-up"
            });}
        );
    }

}