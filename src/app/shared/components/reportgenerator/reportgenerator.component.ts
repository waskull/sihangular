import { Component, Input, OnInit } from '@angular/core';


import * as pdfMake from 'pdfmake/build/pdfmake.min';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'reportgenerator',
  templateUrl: './reportgenerator.component.html',
  styleUrls: ['./reportgenerator.component.scss']
})
export class ReportgeneratorComponent implements OnInit {

  @Input() data!: any;
  @Input() isSale: boolean = false;
  @Input() isPurchase: boolean = false;
  @Input() isBill: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  generatePurchaseReport() {
    let title = 'REPORTE DE PEDIDO';
    let doccDefinition: any = {
      header: '',
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
          color: '#4b1eac'
        },
        {
          text: 'Datos del Cliente',
          style: 'sectionHeader'
        },

        {
          columns: [
            [
              {
                text: `Vendedor: ${this.data.salesman}`,
                bold: true
              },
            ],
            [
              {
                text: `Fecha: ${this.data.date.toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Pedido: #${(this.data.id)}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DEL PEDIDO',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio', 'Cantidad', 'Total'],
              ...this.data.ite.map((p: { name: any; price: number; qty: number; }) => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total a Pagar:', colSpan: 3 }, {}, {}, this.data.ite.reduce((sum: number, p: { qty: number; price: number; }) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        { text: 'Codigo QR', alignment: 'center', italics: true, margin:[15,15,15,15] },
        {
          columns: [
            [{ qr: `${this.data.id.toString()}`, fit: '100', alignment: 'center', margin:[15,15,0,15] }],
          ]
        },
        {
          text: 'Terminos y Condiciones',
          style: 'sectionHeader'
        },
        {
          ul: [
            'La garantia de los productos estara sujeta a los terminos y condiciones del proveedor.',
            'Este es un reporte de pedido generado por el sistema SIHANGULAR.',
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
    pdf.download(`reporte-pedido-${(this.data.id)}.pdf`);
  }

  generateBillReport() {

    let title = 'REPORTE DE FACTURA';
    let doccDefinition: any = {
      header: '',
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
          color: '#4b1eac'
        },
        {
          text: 'Datos del Cliente',
          style: 'sectionHeader'
        },

        {
          columns: [
            [
              {
                text: `Vendedor: ${this.data.salesman}`,
                bold: true
              },
              {
                text: `Cliente: ${this.data.client}`,
                bold: false
              },
              { text: `Correo: ${this.data.email}` },
              { text: `Telefono: ${this.data.phone}` }
            ],
            [
              {
                text: `Fecha: ${this.data.date.toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Factura: #${(this.data.id.toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DE LA FACTURA',
          style: 'sectionHeader'
        },
        {
          text: `Estado: ${this.data.status}`,
          margin: [0, 0, 0, 15]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio', 'Cantidad', 'Total'],
              ...this.data.ite.map((p: { name: any; price: number; qty: number; }) => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total a Pagar:', colSpan: 3 }, {}, {}, this.data.ite.reduce((sum: number, p: { qty: number; price: number; }) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          },
        },
        {
          columns:[
            [{text: `Codigos de Referencia: ${this.data.pay_code.map((e: any, i:number) => {return "\n"+(i+1)+"- "+e})}`, bold:true}]
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
            'Este es un reporte de factura generado por el sistema SIHANGULAR.',
          ],
        },
        { text: 'Codigo QR', alignment: 'center', italics: true, margin:[15,15,15,15] },
        {
          columns: [
            [{ qr: `${this.data.id.toString()}`, fit: '100', alignment: 'center', margin:[15,15,0,15] }],
          ]
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
    pdf.download(`reporte-factura-${(this.data.id)}.pdf`);
  }

  generateReport() {
    let title = 'REPORTE DE VENTA';
    let doccDefinition: any = {
      header: '',
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
          color: '#4b1eac'
        },
        {
          text: 'Datos del Cliente',
          style: 'sectionHeader'
        },

        {
          columns: [
            [
              {
                text: `Vendedor: ${this.data.salesman}`,
                bold: true
              },
              {
                text: `Cliente: ${this.data.client}`,
                bold: false
              },
              { text: `Correo: ${this.data.email}` },
              { text: `Telefono: ${this.data.phone}` }
            ],
            [
              {
                text: `Fecha: ${this.data.date.toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Venta: #${(this.data.id.toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'DETALLES DE LA VENTA',
          style: 'sectionHeader'
        },
        {
          text: `Estado: ${this.data.status}`,
          margin: [0, 0, 0, 15]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio', 'Cantidad', 'Total'],
              ...this.data.ite.map((p: { name: any; price: number; qty: number; }) => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total a Pagar:', colSpan: 3 }, {}, {}, this.data.ite.reduce((sum: number, p: { qty: number; price: number; }) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        { text: 'Codigo QR', alignment: 'center', italics: true, margin:[15,15,15,15] },
        {
          columns: [
            [{ qr: `${this.data.id.toString()}`, fit: '100', alignment: 'center', margin:[15,15,0,15] }],
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
            'Este es un reporte de de ventas generado por el sistema SIHANGULAR.',
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
    pdf.download(`reporte-venta-${(this.data.id)}.pdf`);
  }
  generate(){
    if(this.isBill) {
      this.generateBillReport();
    }
    else if(this.isPurchase) {
      this.generatePurchaseReport()
    }
    else {
      this.generateReport();
    }
  }
}
