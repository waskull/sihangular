import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/shared/services/bill/bill.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  constructor(private billService: BillService, private datepipe: DatePipe, private authService: AuthService) { }
  search:string = '';
  showButton:boolean = false;
  columnNames = ['articulos','TOTAL A PAGAR','TOTA PAGADO','referencias de pago','estado','vendedor','Fecha de creación','Fecha ultima actualización']
  columns = ['items','total','total_paid','pay_code','status','salesman','date','updateAt']
  op = {delete:true,edit:true}
  billList: any[] = [];
  ngOnInit(): void {
    this.authService.user$.subscribe(r => {
      this.showButton = r?.roles[0] !== 'vendedor';
    });
    this.loadData();
  }
  loadData(){
    this.billService.getBills().subscribe(res => {
      res.forEach(e => {
        this.billList.push({
          id:e.id,
          total: e.total,
          total_paid: e.total_paid,
          updateAt:this.datepipe.transform(e.updateAt, 'dd-MM-yyyy, h:mm a'),
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          pay_code: e.pay_code.map((ee: string) => {
            return ee+" ";
          }),
          salesman: `${e.createdBy.firstname} ${e.createdBy.lastname}`,
          client: `${e.sale.client.firstname} ${e.sale.client.lastname}`,
          phone:e.sale.client.email,
          email:e.sale.client.phone,
          status: e.sale.status,
          items: e.sale.sale_items.map((ee: { item: { name: any; }; quantity: any; }) => {
            return `${ee.item.name} cantidad: ${ee.quantity}`
          }),
          ite: e.sale.sale_items.map((ee: { item: { id: any; name: any; price: string; }; quantity: string; }) => {
            return {id: ee.item.id, name:ee.item.name, qty:parseInt(ee.quantity), price: parseFloat(ee.item.price)};
          }),
          sale: e.sale.id
        });
      });
      }
    );
  }
  edit(data: any){
    const tempList = this.billList.filter(res => data.id !== res.id);
    this.billList = [...tempList, data];
  }
  delete(data: any){
    this.billService.delete(data.id).subscribe(res => {
      this.billList = this.billList.filter(res => data.id !== res.id);
    });
  }
  newValue(data: any){
    this.loadData();
  }

}
