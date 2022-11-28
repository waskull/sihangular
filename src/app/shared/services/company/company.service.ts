import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../../enums/apiPaths';
import { Company } from '../../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = environment.baseUrl+ApiPaths.Company;
  constructor(private http: HttpClient) { }
  
  getCompanies(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
  getCompany(id: number){
    return this.http.get<any>(this.url+id);
  }

  create(company: Company){
    return this.http.post(this.url,company);
  }

  edit(company: any, id:number){
    return this.http.patch(this.url+id, company);
  }

  delete(id:number){
    return this.http.delete(this.url+id);
  }
}
