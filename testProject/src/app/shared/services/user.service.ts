import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError  } from "rxjs";
import { User } from "../models/user.model";
import {catchError} from 'rxjs/operators';
import { UserTrackerError } from '../models/userTrackerError.model';



@Injectable()
export class UserService {

    private link="http://localhost:50508/api/user";
    private msg:string;
    

    constructor(private http: HttpClient) {}

    getUserByUsernameAndPassword(username:string, password:string): Observable<User| UserTrackerError> {

        this.msg="Username or Password are wrong!";

        return this.http.get<User>(`${this.link}?username=${username}&password=${password}`)
         .pipe(
             catchError(err=>this.handleHttpError(err, this.msg))
         );
    }

     addUser(newUser:User):Observable<User|UserTrackerError>{

        this.msg="This username exists in the system."

        return this.http.post<User>(`${this.link}`, newUser,{
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            })
        })
        .pipe(
            catchError(err=>this.handleHttpError(err, this.msg))
        );
     }



    private handleHttpError(error:HttpErrorResponse, msg:string):Observable<UserTrackerError>{
        let dataError=new UserTrackerError();
        dataError.errorNumber=error.status;
        dataError.message= error.statusText;
        dataError.userMessage=msg;
        return throwError(dataError);  
    }
}