import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';

@Injectable({
  providedIn: 'root'
})
export class SheduleService {
  url = environment.baseUrl+ApiPaths.Schedules;
  constructor(private http: HttpClient) { }
  
  getSchedules(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getSchedule(id: number){
    return this.http.get<any>(this.url+id);
  }

  create(schedule: any){
    return this.http.post(this.url,schedule);
  }

  edit(schedule: any, id:number){
    return this.http.patch(this.url+id, schedule);
  }
  editStatus(status: any, id:number){
    return this.http.put(this.url+id, status);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
