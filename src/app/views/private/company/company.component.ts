import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company/company.service';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  columnNames = ['Nombre','Direccion','Cliente','Telefono','Telefono #2']
  columns = ['name','address','clientname','phone','phone2']
  op = {delete:true,edit:true}
  companyList: any[] = [];
  
  search: string = '';
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }
  loadCompanies(){
    this.companyService.getCompanies().subscribe(res => {
      let temp:any[] = [];
      res.forEach((e,i) => {
        const name = e.client.firstname+" "+e.client.lastname;
        e.clientname = name;
        temp.push(e);
      });
      this.companyList = temp;
    });
  }
  edit(company: any){
    const tempList = this.companyList.filter(res => company.id !== res.id);
    this.companyList = [...tempList, company];
  }
  delete(company: any){
    this.companyService.delete(company.id).subscribe(res => {
      this.companyList = this.companyList.filter(res => company.id !== res.id);
    });
  }
  newValue(data: any){
    this.loadCompanies();
  }
}
