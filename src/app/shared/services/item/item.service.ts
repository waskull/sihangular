import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = environment.baseUrl+ApiPaths.Item;
  constructor(private http: HttpClient) { }
  
  getItems(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getItem(id: number){
    return this.http.get<any>(this.url+id);
  }

  create(item: any){
    return this.http.post(this.url,item);
  }

  edit(item: any, id:number){
    return this.http.patch(this.url+id, item);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
