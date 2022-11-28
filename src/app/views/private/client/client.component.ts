import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client/client.service';

@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  search: string = '';
  columnNames = ['nombre','apellido','cedula','email','telefono','Cliente desde']
  columns = ['firstname','lastname','cedula','email','phone','createdAt']
  op = {delete:true,edit:true}
  clientList: any[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.clientService.getClients().subscribe(res => this.clientList = res);
  }
  edit(client: any){
    const tempList = this.clientList.filter(res => client.id !== res.id);
    this.clientList = [...tempList, client];
  }
  delete(client: any){
    console.log(client.id);
    this.clientService.delete(client.id).subscribe(res => {
      this.clientList = this.clientList.filter(res => client.id !== res.id);
    });
  }
  create(){

  }
  newValue(data: any){
    this.loadData();
  }

}
