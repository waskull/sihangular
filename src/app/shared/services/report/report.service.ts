import { Injectable, Input } from '@angular/core';
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { map } from 'rxjs';
import { BillService } from '../bill/bill.service';
import { PurchaseService } from '../purchase/purchase.service';
import { SaleService } from '../sale/sale.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  parseData:any = [];
  private salesman: string = '';
  constructor(private purchaseService: PurchaseService,
    private billService: BillService,
    private saleService: SaleService) { }

  async generateSalesReport(title: string, columns: string[], footer: string[], data: any) {
    //   let response: any[] = [];
    //   this.saleService.getSales().subscribe(res => {
    //     response = res;
    //   });
    //   if(!response) return
    //   let parseData:any[] = []
    //   console.log(response);
    //   response.map((item: { item: any; price: any; quantity: any; client: any; }) => {
    //     parseData.push([
    //       item.item,
    //       item.price,
    //       item.quantity
    //     ])
    //   })
    //   // let main = 'Reporte de Ventas';
    //   // let main = title;
    //   let c = ['Nombre', 'Precio de Compra', 'Cantidad'];
    //   let f = [['Total:', data.price,' ', ' ']];
    //  // if(items === 1) {title = 'Reporte de Venta';}
    //   this.generatePdf(
    //     title,
    //     'reporte',
    //     columns,
    //     parseData,
    //     footer,
    //   );
  }

  generatePdf(main: string, title: string, head: any, body: any, foot: any) {
    const doc = new jsPDF();
    console.log(body.length);
    doc.text(main, 100, 18);
    //doc.text(main, 100, 18, 'center');
    autoTable(doc, { html: '#tablee' });
    autoTable(doc, {
      theme: 'grid',
      headStyles: { fillColor: "#7248d0" },
      footStyles: { fillColor: "#7248d0" },
      head: [head],
      body: body,
      foot: foot
    })

    //doc.save(title)
  }

  generateSaleReport(title: string, columns: string[], data: any) {
     let salesman:string = '';
    this.parseData = [];
    this.saleService.getSale(parseInt(data.id)).subscribe(res => {
      data.email = res.client.email;
      data.salesm = `${res.salesman.firstname} ${res.salesman.lastname}`;
      data.phone = res.client.phone;
      for (let i = 0; i < res.sale_items.length; i++) {
        this.parseData.push({
          id: res.sale_items[i].id,
          name: res.sale_items[i].item.name,
          qty: res.sale_items[i].quantity,
          price: parseFloat(res.sale_items[i].price)
        });
        this.salesman = `${res.salesman.firstname} ${res.salesman.lastname}`;
        salesman = `${res.salesman.firstname} ${res.salesman.lastname}`;
      }

    });
    console.log("p: ",this.parseData);
    console.log("data: ",data);
    console.log("sale", this.salesman);
    let action = 'open';
    const dat = [
      {
        name: 'g',
        price: 5,
        qty: 2
      },
      {
        name: 'gx',
        price: 2,
        qty: 6
      }
    ];
    
    let doccDefinition: any = {
      header: 'x',
      content: [
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
          color: 'skyblue'
        },
        {
          text: 'Datos del Cliente',
          style: 'sectionHeader'
        },

        {
          columns: [
            [
              {
                text: `Vendedor: ${data.salesm}`,
                bold: true
              },
              {
                text: data.client,
                bold: false
              },
              { text: 'client_address' },
              { text: data.email },
              { text: data.phone }
            ],
            [
              {
                text: `Fecha : ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Factura:: ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Detalles de la Factura',
          style: 'sectionHeader'
        },
        {
          text: `Estado: ${data.status}`,
          margin: [0, 0, 0, 15]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio', 'Cantidad', 'Total'],
              ...this.parseData.map((p: { name: any; item: { price: any; }; qty: number; price: number; }) => ([p.name, p.item.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total a Pagar:', colSpan: 3 }, {}, {}, dat.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          columns: [
            [{ qr: `${data.id.toString()}`, fit: '50' }],
            [{ text: 'Codigo QR', alignment: 'right', italics: true }],
          ]
        },
        {
          text: 'Terminos y Condiciones',
          style: 'sectionHeader'
        },
        {
          ul: [
            'La venta solo se puede retornar en los proximos 10 dias.',
            'La garantia de los productos estara sujeta a los terminos y condiciones de los fabricantes/productores.',
            'Esta es una factura generada por el sistema SIHANGULAR.',
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


    //pdfMake.createPdf(docDefinition).print();
    const pdf = pdfMake.createPdf(doccDefinition);
    pdf.open();
  }

  async generateSaleReportc(title: string, columns: string[], data: any) {
    var parseData: any[][] = [];
    this.saleService.getSale(parseInt(data.id)).subscribe((res: { sale_items: string | any[]; }) => {
      // res.sale_items.forEach((e: { item: { name: any; price: string; }; quantity: string; }) => {
      //   parseData.push([
      //     e.item.name,
      //     e.item.price.toString(),
      //     e.quantity.toString()
      //   ]);
      // });
      for (let i = 0; i < res.sale_items.length; i++) {
        parseData.push([
          res.sale_items[i].item.name,
          res.sale_items[i].item.price,
          res.sale_items[i].quantity
        ]);
      }
    });
    //if(!response) return;
    let f = [['Total:', data.price, 'Estado: ' + data.status]];
    //if(items === 1) {title = 'Reporte de Venta';}
    //this.generatePdf(title, 'reporte', columns, parseData, f);
    const cols = [['Nombre', 'Precio de Venta', 'Cantidad']]
    const doc = new jsPDF();
    const file = 'reporte.pdf'
    doc.text(title, 100, 18);
    console.log("g: ", parseData);
    var falseArray: any[][] = [
      ['g', 'h', 4], ['h', 4, 'hf']
    ]
    console.log("f: ", falseArray);
    //doc.text(main, 100, 18, 'center');
    autoTable(doc, { html: '#tableee' })
    autoTable(doc, {
      headStyles: { fillColor: "#7248d0" },
      footStyles: { fillColor: "#7248d0" },
      head: [columns],
      body: falseArray,
      foot: f
    });
    doc.save(file);
  }

}

