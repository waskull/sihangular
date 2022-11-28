import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User, UserEdit } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss']
})
export class UsereditComponent implements OnInit {
  userForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  userData!:any;
  constructor(private router:Router,private fb: FormBuilder, private userService: UserService, private authService: AuthService ){ }

  ngOnInit(): void {
    this.userForm = this.initForm();
    this.authService.getUserData().subscribe(res => {
      this.userForm.patchValue(res);
    });
  }
  initForm():FormGroup{
    return this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.min(3)]],
      age: [1, [Validators.required, Validators.min(1)]],
      pass: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.minLength(1)]],
    });
  }
  sendData(){
    let user:UserEdit = {
      firstname:this.userForm.value.firstname,
      lastname:this.userForm.value.lastname,
      cedula: this.userForm.value.cedula,
      age: this.userForm.value.age,
      phone: this.userForm.value.phone,
      password: this.userForm.value.pass
    };
      const id: number = 0;
      this.userService.editMyUser(user).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar tu Usuario';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        this.router.navigate(['/']);
      });
    
  }
}

