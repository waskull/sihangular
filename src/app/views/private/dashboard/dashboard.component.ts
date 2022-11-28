import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BillService } from 'src/app/shared/services/bill/bill.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  public userData: string = '';
  public stats!:any;
  public bills:any[] = [];
  constructor(private authService: AuthService, private readonly billService: BillService, private readonly datepipe: DatePipe) {
  }

  createChart(data:any[]){
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: data.map((e: { name: string; }) => {
            return e?.name || undefined
          }),
          datasets: [{
              label: '# de Ventas',
              data: data.map((e: { sales: string; }) => {
                return parseInt(e?.sales || '0')
              }),
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins:{
            title: {
              display: true,
              text: 'Articulos mas vendidos'
          }
          }
      }
  });
  }
  columnNames = ['articulos','TOTAL A PAGAR','TOTA PAGADO','referencias de pago','estado','vendedor','Fecha de Actualización']
  columns = ['items','total','total_paid','pay_code','status','salesm','date']
  rows = [{name:'asd',asd:'asdf'},{name:'123',asd:'456'}]
  op = {delete:true,edit:true}
  editItem(item:any){
    console.log(item);
  }
  deleteItem(item:any){
    console.log(item);
  }

  ngOnInit(): void {
    this.billService.getStats().subscribe(res => {
      this.stats = res;
      this.createChart(this.stats.topsales);
    });
    this.billService.getLastFourBills().subscribe(res => {
      this.bills = res;
      this.bills.forEach(e => {
        e.status = e.sale.status;
        e.items = e.sale.sale_items.map((r: { item: { name: string; }; quantity: string; }) => {
          return r.item.name+" cantidad: "+r.quantity+", "
        });
        e.salesm = e.createdBy.firstname+" "+e.createdBy.lastname;
        e.date = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a');
        e.updateAt = this.datepipe.transform(e.updatedAt, 'dd-MM-yyyy, h:mm a')
      });
      
    });
  }
  getUserInfo(){
    return this.authService.getData()?.firstname + " " +this.authService.getData()?.lastname;
  }

}
