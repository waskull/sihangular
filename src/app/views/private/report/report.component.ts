import { Component, OnInit } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import { BillService } from 'src/app/shared/services/bill/bill.service';
import { PurchaseService } from 'src/app/shared/services/purchase/purchase.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import * as dayjs from 'dayjs';

import * as pdfMake from 'pdfmake/build/pdfmake.min';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export enum ECalendarValue {
  Dayjs = 1,
  DayjsArr,
  String,
  StringArr
}

export const DEF_CONF: IDatePickerConfig = {
  firstDayOfWeek: 'su',
  monthFormat: 'MMM, YYYY',
  disableKeypress: false,
  closeOnSelect: undefined,
  closeOnSelectDelay: 100,
  openOnFocus: true,
  openOnClick: true,
  onOpenDelay: 0,
  closeOnEnter: true,
  weekDayFormat: 'ddd',
  showNearMonthDays: true,
  showWeekNumbers: false,
  enableMonthSelector: true,
  yearFormat: 'YYYY',
  showGoToCurrent: true,
  dayBtnFormat: 'DD',
  monthBtnFormat: 'MMM',
  hours12Format: 'hh',
  hours24Format: 'HH',
  meridiemFormat: 'A',
  minutesFormat: 'mm',
  minutesInterval: 1,
  secondsFormat: 'ss',
  secondsInterval: 1,
  showSeconds: false,
  showTwentyFourHours: false,
  timeSeparator: ':',
  multipleYearsNavigateBy: 10,
  showMultipleYearsNavigation: false,
  hideInputContainer: false,
  returnedValueType: ECalendarValue.String,
  unSelectOnClick: true,
  hideOnOutsideClick: true,
  numOfMonthRows: 3,
  max: dayjs().add(1, 'day'),
  min: dayjs('2022-11-01')
};

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  logo:string = 'data:image/png;base64,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'
  start:any = dayjs('2022-11-02');
  end: any = dayjs().add(1,'day');
  data:any[] = [];
  config: any = {
    ...DEF_CONF,
    format: 'YYYY-MM-DD'
  };
  option:string = 'purchases';
  buttonText:string = 'Pedidos';
  constructor(private billService: BillService, 
    private saleService: SaleService, 
    private purchaseService: PurchaseService) { }

  ngOnInit(): void {
  }

  getRows(){
    this.data = [];
    let total = 0;
    if(this.option === 'purchases'){
      this.buttonText = 'Pedidos';
      this.purchaseService.getPurchasesByDate(this.start,this.end).subscribe(e => {
        if(e.length > 0) {
          e.forEach(r => {
              let name:string = '';
              this.data.push({
                id: r.id,
                price: r.price,
                bought_by: r.bought_by,
                items: r.order_items.map((res: { item: {name:string;} }) => {
                  name += res.item.name+" ";
                }),
                item: name,
                quantity: r.order_items[0].quantity
              });
           
            total+=(parseFloat(r.price));

          });
        }
        this.generatePurchasesReport(total)
      });
    }
    else if(this.option ==='sales'){
      this.saleService.getSalesByDate(this.start,this.end).subscribe(e => {
        if(e.length > 0) {
          e.forEach(r => {
            r.sale_items.forEach((res: any) => {
              this.data.push({id: r.id,item: res.item,quantity: res.quantity,status:r.status, total:parseFloat(r.total),total_paid: parseFloat(r.total_paid),salesman: r.salesman,client: r.client});
            });
            
          });
          this.generateSalesReport();
        }
      });
    }
    else{
      this.billService.getBillsByDate(this.start,this.end).subscribe(e => {
        if(e.length > 0) {
          e.forEach(r => {
            this.data.push({id: r.id,status:r.sale.status, total:parseFloat(r.total),total_paid: parseFloat(r.total_paid),salesman: r.sale.salesman,client: r.sale.client});
          })
          this.generateBillsReport();
        }
      });
    }
  }
  updateButton(event:any){
    this.buttonText = event.target.options[event.target.options.selectedIndex].text+'s';
  }
  generatePurchasesReport(total:number){
    const code = Math.random().toString(36).slice(2).toUpperCase();
    let title = 'REPORTE DE PEDIDOS';
    let doccDefinition: any = {
      header: '',
      content: [
        {
          image: this.logo,
          width: 150,
          alignment: 'center'

        },
        {
          text: 'SIHAM JD',
          fontSize: 16,
          alignment: 'center',
          color: '#7248d0'
        },
        {
          text: title,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#4b1eac'
        },

        {
          columns: [
            [
              {
                text: `Fecha: ${new Date().toLocaleDateString()}`,
                alignment: 'right'
              },
              {
                text: `Reporte: ${code}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DE LOS PEDIDOS',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
              ['ID de Pedido','Articulos', 'Precio','Solicitado Por'],
              ...this.data.map((p: {item:string;id:number;price: string; bought_by:{firstname:string;lastname:string} }) => ([p.id,p.item, p.price, `${p.bought_by.firstname} ${p.bought_by.lastname}`])),
            ]
          },
        },
        [
          {
            text: 'Total pagado por Pedidos:',
            bold: true,
            fontSize: 14,
            alignment: 'right',
            italics: true,
            border: [true, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: total,
            bold: true,
            fontSize: 14,
            alignment: 'right',
            border: [false, false, false, true],
            fillColor: '#f5f5f5',
            margin: [0, 0, 0, 5],
            decoration: 'underline'
          },
        ],
        {
          text: 'Nota:',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Esto es un reporte de pedidos generado por el sistema SIHANGULAR.'
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    }


    const pdf = pdfMake.createPdf(doccDefinition);
    pdf.download(`reporte-pedidos-${code}.pdf`);
  }
  generateBillsReport(){
    let title = 'REPORTE DE FACTURAS';
    const code = Math.random().toString(36).slice(2).toUpperCase();
    let doccDefinition: any = {
      header: '',
      content: [
        {
          image: this.logo,
          width: 150,
          alignment: 'center'

        },
        {
          text: 'SIHAM JD',
          fontSize: 16,
          alignment: 'center',
          color: '#7248d0',
          margin: [0, 0, 0, 0]
        },
        {
          text: title,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#4b1eac'
        },
        {
          columns: [
            [
              {
                text: `Fecha: ${new Date().toLocaleDateString()}`,
                alignment: 'right'
              },
              {
                text: `Reporte: ${code}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DE LAS FACTURAS',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto','auto'],
            body: [
              ['Factura','Vendedor', 'Total Pagado', 'Total a Pagar', 'Cliente'],
              ...this.data.map((p: {salesman:{firstname:string;lastname:string};client:{firstname:string;lastname:string};id:number;total_paid:number; total: number; }) => ([p.id,`${p.salesman.firstname} ${p.salesman.lastname}`, p.total_paid, p.total, `${p.client.firstname} ${p.client.lastname}`])),
              
            ]
          },
        },
        [
          {
            text: 'Total Acumulado',
            bold: true,
            fontSize: 14,
            alignment: 'right',
            italics: true,
            border: [true, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: this.data.reduce((sum: number, p: { total_paid: number;}) => sum + p.total_paid, 0).toFixed(2),
            bold: true,
            fontSize: 14,
            alignment: 'right',
            border: [false, false, false, true],
            fillColor: '#f5f5f5',
            margin: [0, 0, 0, 5],
            decoration: 'underline'
          },
        ],
        {
          text: 'Terminos y Condiciones',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Esto es un reporte de facturas general generado por el sistema SIHANGULAR.'
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    }


    const pdf = pdfMake.createPdf(doccDefinition);
    pdf.download(`reporte-facturas-${code}.pdf`);
   
  }
  generateSalesReport(){
    let title = 'REPORTE DE VENTAS';
    const code = Math.random().toString(36).slice(2).toUpperCase();
    let doccDefinition: any = {
      header: '',
      content: [
        {
          image: this.logo,
          width: 150,
          alignment: 'center'

        },
        {
          text: 'SIHAM JD',
          fontSize: 16,
          alignment: 'center',
          color: '#7248d0'
        },
        {
          text: title,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#4b1eac'
        },

        {
          columns: [
            [
              {
                text: `Fecha: ${new Date().toLocaleDateString()}`,
                alignment: 'right'
              },
              {
                text: `Reporte: ${code}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DE LAS VENTAS',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto','auto','auto'],
            body: [
              ['ID de Venta','Articulo', 'Precio', 'Cantidad', 'Monto', 'Cliente'],
              ...this.data.map((p: {item:{name:string;price:string};client:{firstname:string;lastname:string};id:number; quantity: number; }) => ([p.id,p.item.name, parseFloat(p.item.price), p.quantity, (parseFloat(p.item.price) * p.quantity).toFixed(2), `${p.client.firstname} ${p.client.lastname}`])),
            ]
          },
        },
        [
          {
            text: 'Total a Pagar:',
            bold: true,
            fontSize: 14,
            alignment: 'right',
            italics: true,
            border: [true, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: this.getTotal(),
            bold: true,
            fontSize: 14,
            alignment: 'right',
            border: [false, false, false, true],
            fillColor: '#f5f5f5',
            margin: [0, 0, 0, 5],
            decoration: 'underline'
          },
        ],
        {
          text: 'Terminos y Condiciones',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Esto es un reporte de ventas generado por el sistema SIHANGULAR.'
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    }


    const pdf = pdfMake.createPdf(doccDefinition);
    pdf.download(`reporte-ventas-${code}.pdf`);
  }

  getTotal(){
    return this.data.reduce((sum: number, p: { quantity: number; item:{price: string;} }) => sum + (p.quantity * parseFloat(p.item.price)), 0).toFixed(2);
  }
}
