import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.baseUrl+ApiPaths.Bills;
  constructor(private http: HttpClient) { }
  
  getBills(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getBill(id: number){
    return this.http.get<any>(this.url+id);
  }
  getLastFourBills(){
    return this.http.get<any[]>(this.url+'lastfour');
  }

  getBillsByDate(start:Date, end:Date){
    return this.http.post<any[]>(this.url+'date', {start,end});
  }

  getStats(){
    return this.http.get<any>(this.url+'stats');
  }

  create(bill: any){
    return this.http.post(this.url,bill);
  }

  edit(bill: any, id:number){
    return this.http.patch(this.url+id, bill);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
