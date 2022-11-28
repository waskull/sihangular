import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  url = environment.baseUrl+ApiPaths.Inventory;
  constructor(private http: HttpClient) { }
  
  getInventory(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getInventoryItem(id: number){
    return this.http.get<any>(this.url+id);
  }

  edit(inventory: any, id:number){
    return this.http.patch(this.url+id, inventory);
  }
}
