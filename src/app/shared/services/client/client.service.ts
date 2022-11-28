import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = environment.baseUrl+ApiPaths.Client;
  constructor(private http: HttpClient) { }
  
  getClients(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getClient(id: number){
    return this.http.get<any>(this.url+id);
  }

  create(client: any){
    return this.http.post(this.url,client);
  }

  edit(client: any, id:number){
    return this.http.patch(this.url+id, client);
  }

  delete(id: number){
    return this.http.delete(this.url+id);
  }
}
