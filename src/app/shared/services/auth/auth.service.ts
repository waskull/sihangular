import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiPaths } from '../../enums/apiPaths';
import { environment } from 'src/environments/environment';
import { User, UserLogin } from '../../models/user';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  baseURL = environment.baseUrl;
  logged:boolean = false;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ : Observable<User | null> = this.userSubject.asObservable();
  usuario!:any;
  private user:User = {
    id:0,
    email:'',
    firstname:'',
    lastname:'',
    cedula:'',
    phone:'',
    age:0,
    roles:['']
  }
  isLoggedIn(): Observable<boolean>{
    return this._isLoggedIn$.asObservable();
  }
  setData(){
    this.getUserData().subscribe(res => {
      this.userSubject.next(res)
      this._isLoggedIn$.next(true);
      this.logged = true;
      this.usuario = res;
    });
  }
  getData(){
    return this.userSubject.value;
  }
  constructor(private http: HttpClient) {
        this.setData();
  }

  handleError(err:any): Observable<never>{
    let errorMessage = 'Un error ha ocurrido obteniendo los datos';
    if (err){
      console.log(err);
      errorMessage = "Error: "+err.error.message;
    }
    return throwError(() => errorMessage);
  }

  login(userData:UserLogin): Observable<any>{
    return this.http.post<any>(this.baseURL+ApiPaths.Login, userData).pipe(map((res:any) => {
      this._isLoggedIn$.next(true);
      this.user = res.user;
      this.userSubject.next(res.user);
    }),
    catchError((err) =>
      this.handleError(err))
    );
  }
  logout(){
    this.http.post(this.baseURL+ApiPaths.Logout,{});
    this.userSubject.next(null);
    this._isLoggedIn$.next(false);
  }

  public setUsuario(userData: User):void{
    this.user = {
      id:userData.id,
      email:userData.email,
      firstname:userData.firstname,
      lastname:userData.lastname,
      cedula:userData.cedula,
      phone:userData.phone,
      age:userData.age,
      roles:userData.roles
    }
  }
  
  public getUser(){
    this.getUserData().subscribe(res => {
      this.setUsuario(res);
    });
    return this.user;
  }
  public getNombre(){
    return this.user.firstname +" "+ this.user.lastname;
  }
  loggedIn(){
  	try {
      this.getUserData().subscribe(res=>{
        this._isLoggedIn$.next(true);
      }); 
    } catch (error) {
      console.log("Error al autenticarte: ", error);
    }
    this._isLoggedIn$.next(false);
  }
  getUserData(): Observable<User>{
    return this.http.get<User>(this.baseURL+ApiPaths.Profile);
  }

  Logout(): Observable<any>{
    this.userSubject.next(null);
    this._isLoggedIn$.next(false);
    return this.http.post(this.baseURL+ApiPaths.Logout,{})
  }
}
