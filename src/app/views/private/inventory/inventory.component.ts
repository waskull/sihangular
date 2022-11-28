import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  columnNames = ['nombre','inventario','fecha de creación','ultima actualización']
  columns = ['name','stock','createdAt','updateAt']
  op = {delete:false,edit:false}
  inventoryList: any[] = [];
  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.inventoryService.getInventory().subscribe(res => {
      let tmpList:any[] = [];
      res.forEach(e => {
        e.name = e.item.name;
        tmpList.push(e);
      });
      this.inventoryList = tmpList;
    });
  }
  edit(data: any){
    const tempList = this.inventoryList.filter(res => data.id !== res.id);
    this.inventoryList = [...tempList, data];
  }
  
  newValue(data: any){
    this.loadData();
  }

}
