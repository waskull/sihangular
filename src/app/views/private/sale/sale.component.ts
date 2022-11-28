import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  columnNames = ['articulos comprados','precio estimado','Vendido por','cliente','ESTADO','Fecha de la venta']
  columns = ['items','price','salesman','client','status', 'date'];
  op = {delete:true,edit:false}
  saleList: any[] = [];
  constructor(private saleService: SaleService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.saleService.getSales().subscribe(res => {
      let total: number = 0;
      res.forEach(e => {
        let items: string = '';
        e.sale_items.forEach((r: { item: { name: string; price: string; id: any; quantity: any; }; quantity: string; }) => {
          items+=r.item.name+" cantidad: "+ r.quantity+"| ";
          total+=parseFloat(r.item.price)*parseInt(r.quantity);
        });
        this.saleList.push({
          salesman: e.salesman.firstname+" "+e.salesman.lastname,
          client: e.client.firstname+" "+e.client.lastname,
          phone:e.client.email,
          email:e.client.phone,
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          id: e.id,
          items: items,
          price: total,
          status: e.status,
          ite: e.sale_items.map((ee: { item: { id: any; name: any; price: string; }; quantity: string; }) => {
            return {id: ee.item.id, name:ee.item.name, qty:parseInt(ee.quantity), price: parseFloat(ee.item.price)};
          }),
        });
        total = 0;
      });
    });
  }
  edit(data: any){
    this.loadData();
  }
  delete(data: any){
    this.loadData();
  }
  newValue(data: any){
    this.loadData();
  }

}
