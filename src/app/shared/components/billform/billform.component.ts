import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Bill } from '../../models/bill';
import { BillService } from '../../services/bill/bill.service';
import { SaleService } from '../../services/sale/sale.service';

@Component({
  selector: 'billform',
  templateUrl: './billform.component.html',
  styleUrls: ['./billform.component.scss']
})
export class BillformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  salesList: any[] = [];
  pay_code: string[] = [];
  total:number = 0;
  constructor(private saleService: SaleService, 
    private billService: BillService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    if(this.data?.id) {
      this.loadActualSale(parseInt(this.data?.sale));
    }
    else{
      this.loadSales();
    }
  }

  addCode(){
    let t = false;
    this.pay_code.forEach(e => {
      if(e === this.dataForm.value.pay_code || this.dataForm.value.pay_code === '') t = true;
    });
    if(!t) {
      this.pay_code.push(this.dataForm.value.pay_code);
      this.dataForm.patchValue({pay_code: ''});
    }
  }

  removeCode(paycode:string){
    this.pay_code = this.pay_code.filter(res => res !== paycode);
  }

  loadSales() {
    let total: number = 0;
    let items: string = '';
    this.salesList = [];
    this.saleService.getWaitingSales().subscribe(res => {
      res.forEach(e => {
        items = '';
        e.sale_items.forEach((r: { item: { name: string; price: string; }; quantity: string; }) => {
          items+=r.item.name+", Cantidad: "+ r.quantity+"| ";
          total+=parseFloat(r.item.price)*parseInt(r.quantity);
        });
        this.salesList.push({
          salesman: e.salesman.firstname+" "+e.salesman.lastname,
          client: e.client.firstname+" "+e.client.lastname,
          date: e.createdAt,
          id: e.id,
          items: items,
          price: total,
          status: e.status
        });
      });
    });
  }
  loadActualSale(id:number){
    let total: number = 0;
    let items: string = '';
    this.salesList = [];
    this.billService.getBill(this.data.id).subscribe(res => {
        this.pay_code = res.pay_code.map((e: any) => {return e});
        items = '';
        res.sale.sale_items.forEach((r: { item: { name: string; price: string; }; quantity: string; }) => {
          items+=r.item.name+", Cantidad: "+ r.quantity+"| ";
          total+=parseFloat(r.item.price)*parseInt(r.quantity);
        });
        this.salesList.push(res);
        this.salesList[0].total = total;
        this.salesList[0].price = total;
        this.salesList[0].items = items;
        this.salesList[0].client = `${res.sale.client.firstname} ${res.sale.client.lastname}`
        this.dataForm.patchValue({
          total_paid: parseFloat(res.total_paid),
          total: res.total,
          sale: parseInt(res.sale.id)
        });
        this.setTotal(res.total);
    });
    
  }
  setTotal(total:any){
    this.total = parseFloat(total);
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      sale: [0, [Validators.required, Validators.min(1)]],
      total_paid: [0,[Validators.required, Validators.min(0)]],
      pay_code: ['',[Validators.required, Validators.minLength(1)]],
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData() {
    if(this.data?.id){
      this.error = '';
      const bill: Bill = {
        total_paid: this.dataForm.value.total_paid,
        pay_code: this.pay_code
      }
      if(bill.pay_code.length < this.data.pay_code.length){
        this.error = 'Vuelve a cargar los codigos de referencia correctamente';
      }
      if(bill.total_paid < this.data.total_paid){
        this.error = 'No puedes introducir un monto inferior al anterior';
      }
      if(this.error === ''){
        this.billService.edit(bill, parseInt(this.data.id)).pipe(
          catchError(err => {
            if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
            else {
              this.error = err?.error?.message || 'Error al Crear la Factura';
            }
            return throwError(() => err);
          })
        ).subscribe(res => {
          this.error = '';
          this.total = 0;
          this.emitForm.emit(bill);
        });
      }
    }
    else{
      console.log("creando");
      const bill: Bill = {
        total_paid: this.dataForm.value.total_paid,
        sale_id: parseInt(this.dataForm.value.sale),
        pay_code: this.pay_code
      }
      this.billService.create(bill).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Crear la Factura';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        this.total = 0;
        this.emitForm.emit(bill);
      });
    }

  }
}