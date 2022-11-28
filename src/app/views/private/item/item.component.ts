import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/item/item.service';

@Component({
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  columnNames = ['nombre','precio','fecha de creación']
  columns = ['name','price','createdAt']
  op = {delete:true,edit:true}
  itemList: any[] = [];
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.itemService.getItems().subscribe(res => {
      this.itemList = res;
    });
  }
  edit(item: any){
    const tempList = this.itemList.filter(res => item.id !== res.id);
    this.itemList = [...tempList, item];
  }
  delete(item: any){
    this.itemService.delete(item.id).subscribe(res => {
      this.itemList = this.itemList.filter(res => item.id !== res.id);
    });
  }
  newValue(data: any){
    this.loadData();
  }

}
