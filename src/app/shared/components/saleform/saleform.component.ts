import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Sale } from '../../models/sale';
import { ClientService } from '../../services/client/client.service';
import { InventoryService } from '../../services/inventory/inventory.service';
import { SaleService } from '../../services/sale/sale.service';

@Component({
  selector: 'saleform',
  templateUrl: './saleform.component.html',
  styleUrls: ['./saleform.component.scss']
})
export class SaleformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: any[] = [];
  inventoryList: any[] = [];
  selectedItems: any[] = [];
  total: number = 0;
  constructor(private salesService: SaleService, 
    private clientService: ClientService, 
    private fb: FormBuilder, 
    private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.loadFormData();
  }

  addItem(item:any){
    let t = false;
    this.selectedItems.forEach(e => {
      if(e.id === item.id) t = true;
    });
    if(!t) {
      item.quantity = this.dataForm.value.quantity
      this.selectedItems.push(item);
      this.calculateTotal(this.selectedItems);
    }
    this.dataForm.patchValue({quantity: 1});
  }

  removeItem(item:any){
    this.selectedItems = this.selectedItems.filter(res => res.id !== item.id);
    this.calculateTotal(this.selectedItems);
  }

  calculateTotal(items: any){
    this.total = 0;
    items.forEach((e: { item: { price: string; }; quantity: string; }) => {
      this.total+=parseFloat(e.item.price) * parseInt(e.quantity);
    });
  }

  loadFormData() {
    this.inventoryService.getInventory().subscribe(res => {
      this.inventoryList = res;
    });
    this.clientService.getClients().subscribe(res => {
      this.clientList = res;
    });
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      client: [0, [Validators.required, Validators.min(1)]],
      item: [0, [Validators.required, Validators.min(1)]],
      quantity: [1,[Validators.required, Validators.min(1)]]
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData() {
    let tmpList:any[] = [];
    this.selectedItems.forEach(e => {
        tmpList.push({
          id: e.id,
          quantity: e.quantity
        });
    });
    let Data: Sale = {
      price: this.dataForm.value.price,
      items: tmpList,
      client: parseInt(this.dataForm.value.client)
    };
    this.salesService.create(Data).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Crear la venta';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.total = 0;
      this.emitForm.emit(Data);
    });

  }
}
