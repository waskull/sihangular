import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item/item.service';

@Component({
  selector: 'itemform',
  templateUrl: './itemform.component.html',
  styleUrls: ['./itemform.component.scss']
})
export class ItemformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  itemList: Item[] = [];
  constructor(private itemService: ItemService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.itemService.getItems().subscribe(res => this.itemList = res);
  }
  initForm():FormGroup{
    const d = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    if(this.data){
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData(){
    let Data:any = {
      name:this.dataForm.value.name,
      price:this.dataForm.value.price
    };
    if(this.data){
      const id: number = this.data?.id;
      this.itemService.edit(Data,id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el articulo';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
        this.emitForm.emit(Data);
      });
    }
    else{
      delete Data?.id;
      this.itemService.create(Data).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Crear el articulo';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        this.emitForm.emit(Data);
      });
    }
  }
}
