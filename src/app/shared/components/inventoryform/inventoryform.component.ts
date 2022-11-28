import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'inventoryform',
  templateUrl: './inventoryform.component.html',
  styleUrls: ['./inventoryform.component.scss']
})
export class InventoryformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: Inventory[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
