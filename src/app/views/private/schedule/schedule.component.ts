import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SheduleService } from 'src/app/shared/services/schedule/shedule.service';

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private scheduleService: SheduleService, private authService: AuthService) { }
  columnNames = ['Descripcion','Compañias','Vendedor','descripcion','ESTADO','creado el']
  columns = ['description','compas','name','description','status','createdAt']
  op = {delete:true,edit:true}
  scheduleList: any[] = [];
  showButton:boolean = false;
  ngOnInit(): void {
    this.authService.user$.subscribe(r => {
      this.showButton = r?.roles[0] !== 'vendedor';
    });
    this.loadData();
  }
  loadData(){
    this.scheduleService.getSchedules().subscribe(res => {
      let names = '';
      let temp:any[] = [];
      res.forEach(e => {
        const name = e.salesman.firstname+" "+e.salesman.lastname;
        e.name = name;
        e.companies.forEach((r: any) => {
          names+=r.name;          
        });
        e.compas = names;
        temp.push(e);
      });
      this.scheduleList = temp;
    });
  }
  edit(data: any){
    this.loadData();
  }
  delete(data: any){
    this.scheduleService.delete(data.id).subscribe(res => {
      this.scheduleList = this.scheduleList.filter(res => data.id !== res.id);
    });
  }
  newValue(data: any){
    this.loadData();
  }

}
