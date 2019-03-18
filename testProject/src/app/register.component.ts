import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from './shared/models/user.model';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { UserTrackerError } from './shared/models/userTrackerError.model';
import { UserService } from './shared/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})


export class RegisterComponent implements OnInit {
  
  error:UserTrackerError = new UserTrackerError();
  userForm: FormGroup;
  newUser:User = {
    Username:undefined,
    Email:undefined,
    Password:undefined
  }

  constructor(private fb:FormBuilder, private userService:UserService, private popup: MatSnackBar){}


    ngOnInit(){
      this.userForm= this.fb.group({
        username: ['',[Validators.minLength(3), Validators.maxLength(50), Validators.required]],
        email: ['',  [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]]
      });
    }

   

    save(){

      if (this.userForm.valid){
        this.newUser=this.userForm.value;

        this.userService.addUser(this.newUser)
        .subscribe(
          ()=> this.onSaveComplete(),
          (err:UserTrackerError)=> this.error=err,                      
          ()=>this.error.userMessage=undefined
        );
      }
      else{

      const usernameControl = Object.keys(this.userForm.get('username').errors);
      const emailControl = Object.keys(this.userForm.get('email').errors);
      const passwordControl = Object.keys(this.userForm.get('password').errors);

        if(usernameControl[0]=="required"
           ||emailControl[0]=="required"
           ||passwordControl[0]=="required")
        {
          this.error.userMessage="Please fill required fields."
        }
        else{
          this.error.userMessage="Please correct validation errors!"
        }

      }
    }

        
    onSaveComplete(){
      this.userForm.reset();

      this.popup.open("New user was created!", "", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: "pop-up"
      })
    }

  
}