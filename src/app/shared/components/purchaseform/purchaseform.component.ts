import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Purchase } from '../../models/order';
import { InventoryService } from '../../services/inventory/inventory.service';
import { PurchaseService } from '../../services/purchase/purchase.service';

@Component({
  selector: 'purchaseform',
  templateUrl: './purchaseform.component.html',
  styleUrls: ['./purchaseform.component.scss']
})
export class PurchaseformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  purchaseData!: Purchase;
  inventoryList: any[] = [];
  selectedItems: any[] = [];
  constructor(private purchaseService: PurchaseService, private fb: FormBuilder, private inventoryService: InventoryService) { }

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
    }
    this.dataForm.patchValue({quantity: 1});
  }

  removeItem(item:any){
    this.selectedItems = this.selectedItems.filter(res => res.id !== item.id);
  }

  loadFormData() {
    this.inventoryService.getInventory().subscribe(res => {
      this.inventoryList = res;
    });
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      price: [0, [Validators.required, Validators.min(0)]],
      item: [0, [Validators.required, Validators.min(0)]],
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
    let Data: Purchase = {
      price: this.dataForm.value.price,
      items: tmpList
    };
    this.purchaseService.create(Data).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Crear la compra';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.emitForm.emit(Data);
    });

  }
}
