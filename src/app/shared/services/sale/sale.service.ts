import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';
import { Sale } from '../../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  url = environment.baseUrl+ApiPaths.Sales;
  constructor(private http: HttpClient) { }
  
  getSales(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }

  getWaitingSales(): Observable<any[]>{
    return this.http.get<any[]>(this.url+"waiting");
  }
  getSale(id: number){
    return this.http.get<any>(this.url+id);
  }

  getSalesByDate(start:Date, end:Date){
    return this.http.post<any[]>(this.url+'date', {start,end});
  }

  create(sale: Sale){
    return this.http.post(this.url,sale);
  }

  edit(sale: any, id:number){
    return this.http.patch(this.url+id, sale);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
