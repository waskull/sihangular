import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
declare var window: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() buttonName:string = 'Nuevo Registro';
  @Input() data!:any;
  @Input() modalId = 'modal';
  @Output() emitData = new EventEmitter<any>();
  formModal: any;
  @Input() userForm: boolean = false;
  @Input() itemForm: boolean = false;
  @Input() inventoryForm: boolean = false;
  @Input() saleForm: boolean = false;
  @Input() purchaseForm: boolean = false;
  @Input() scheduleForm: boolean = false;
  @Input() companyForm: boolean = false;
  @Input() clientForm: boolean = false;
  @Input() billForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }
  openFormModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById(this.modalId)
    );
    this.formModal.show();
  }
  saveSomeThing(data:any) {
    this.emitData.emit(data);
    this.formModal.hide();
  }
  emit(data:any){
    this.saveSomeThing(data);
  }

  close(){
    this.formModal.hide();
  }

}
