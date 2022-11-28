import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.scss']
})
export class ClientformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  clientForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  constructor(private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientForm = this.initForm();
  }
  initForm():FormGroup{
    const d = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.min(3)]],
      age: [1, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.minLength(1)]]
    });
    if(this.data){
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData(){
    let client:Client = {
      firstname:this.clientForm.value.firstname,
      lastname:this.clientForm.value.lastname,
      cedula: this.clientForm.value.cedula,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone
    };
    if(this.data){
      const id: number = this.data?.id;
      this.clientService.edit(client,this.data?.id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el Cliente';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        client.id = id;
        this.emitForm.emit(client);
      });
    }
    else{
      delete client?.id;
      this.clientService.create(client).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el Cliente';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        client.createdAt = new Date();
        this.emitForm.emit(client);
      });
    }
  }
}
