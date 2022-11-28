import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router:Router,
    private readonly fb: FormBuilder
    ) { }
  loginForm!: FormGroup;
  message: string = ''
  error: boolean = false;
  public isSubmiting=false;
  ngOnInit(): void {
    this.loginForm = this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  login(): void{
    this.message = '';
    this.isSubmiting=true;
    this.authService.login(this.loginForm.value).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.error = true;
        if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.message= err?.error?.message || 'Error al logearse';
          }
        return throwError(() => err);
      })
      ).subscribe(res => 
        {
          this.isSubmiting = false;
          this.router.navigate(['/dashboard']);
        }
      );
   
  }

}
