import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/shared/services/purchase/purchase.service';

@Component({
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  columnNames = ['articulos comprados','precio','Vendido por','Fecha del pedido']
  columns = ['items','price','bought_by', 'date'];
  op = {delete:true,edit:true}
  purchaseList: any[] = [];
  constructor(private purchaseService: PurchaseService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.purchaseService.getPurchases().subscribe(res => {
      res.forEach(e => {
        let items: string = '';
        e.order_items.forEach((r: { name: string; quantity: string; item:any }) => {
          items+=r.item.name+" cantidad: "+ r.quantity+"| "
        });
        this.purchaseList.push({
          price: e.price,
          bought_by: e.bought_by.firstname+" "+e.bought_by.lastname,
          salesman: e.bought_by.firstname+" "+e.bought_by.lastname,
          salesman_email: e.bought_by.email,
          salesman_phone: e.bought_by.phone,
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          id: e.id,
          items: items,
          ite: e.order_items.map((ee: { item: { id: any; name: any; price: string; }; quantity: string; }) => {
            return {id: ee.item.id, name:ee.item.name, qty:parseInt(ee.quantity), price: parseFloat(ee.item.price)};
          })
        });
      });
    });
  }
  edit(data: any){
    const tempList = this.purchaseList.filter(res => data.id !== res.id);
    this.purchaseList = [...tempList, data];
  }
  delete(data: any){
    this.purchaseService.delete(data.id).subscribe(res => {
      this.purchaseList = this.purchaseList.filter(res => data.id !== res.id);
    });
  }
  newValue(data: any){
    this.loadData();
  }

}
