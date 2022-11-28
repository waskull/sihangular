import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';
import { User, UserEdit } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl+ApiPaths.User;
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  getUser(id: number){
    return this.http.get<User>(this.url+id);
  }

  createUser(user: User){
    return this.http.post(this.url,user);
  }

  editUser(user: User, id:number){
    delete user?.id;
    delete user?.email;
    return this.http.patch(this.url+id, user);
  }
  editMyUser(user: UserEdit){
    return this.http.put(this.url, user);
  }
  delete(id: number){
    return this.http.delete(this.url+id);
  }
}
