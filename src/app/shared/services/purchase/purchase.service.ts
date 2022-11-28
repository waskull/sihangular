import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';
import { Purchase } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url = environment.baseUrl+ApiPaths.Purchases;
  constructor(private http: HttpClient) { }
  
  getPurchases(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getPurchase(id: number){
    return this.http.get<any>(this.url+id);
  }
  getPurchasesByDate(start:Date, end:Date){
    return this.http.post<any[]>(this.url+'date', {start,end});
  }

  create(purchase: Purchase){
    return this.http.post(this.url,purchase);
  }

  edit(purchase:any, id:number){
    return this.http.patch(this.url+id, purchase);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
