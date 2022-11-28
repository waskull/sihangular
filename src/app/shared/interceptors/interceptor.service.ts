import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	const request = req.clone({
  		withCredentials:true
  	});
  	return next.handle(request).pipe(
		catchError((err: HttpErrorResponse) => {
  
		  if (err.status === 401) {
			if(this.router.routerState.snapshot.url !== '/') {
				this.router.navigateByUrl('/login');
			}
		  }
  
		  return throwError(() => err );
		
		})
	);
  }
}
