import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { User, UserEdit } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() userData!: any;
  userForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.initForm();
  }
  initForm():FormGroup{
    const d = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.min(3)]],
      age: [1, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.minLength(1)]],
      roles: ['gerente', [Validators.required, Validators.minLength(5)]],
    });
    if(this.userData){
      this.editing = true;
      d.patchValue(this.userData);
      if(this.userData?.roles){
        d.patchValue(this.userData?.roles[0]);
      }
    }
    return d;
  }
  sendData(){
    let user:User = {
      firstname:this.userForm.value.firstname,
      lastname:this.userForm.value.lastname,
      cedula: this.userForm.value.cedula,
      age: this.userForm.value.age,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      roles: [
        this.userForm.value.roles
      ]
    };
    if(this.userData){
      const id: number = this.userData?.id;
      this.userService.editUser(user,this.userData?.id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el Usuario';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        user.id = id;
        user.email = this.userForm.value.email;
        this.emitForm.emit(user);
      });
    }
    else{
      delete user?.id;
      this.userService.createUser(user).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el Usuario';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        this.emitForm.emit(user);
      });
    }
  }
}
