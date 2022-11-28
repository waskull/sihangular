import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client/client.service';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'companyForm',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: Client[] = [];
  constructor(private fb: FormBuilder, 
    private companyService: CompanyService, 
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.clientService.getClients().subscribe(res => this.clientList = res);
  }
  initForm():FormGroup{
    const d = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      client_id: [0, [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      phone2: ['']
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
      address:this.dataForm.value.address,
      client_id: parseInt(this.dataForm.value.client_id),
      phone2: this.dataForm.value.phone2,
      phone: this.dataForm.value.phone
    };
    if(this.data){
      const id: number = this.data?.id;
      this.companyService.edit(Data,id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar la compañia';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
        this.clientService.getClient(this.dataForm.value.client_id).subscribe(res => Data.clientname = res.firstname+" "+res.lastname);
        this.emitForm.emit(Data);
      });
    }
    else{
      delete Data?.id;
      this.companyService.create(Data).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar la compañia';
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