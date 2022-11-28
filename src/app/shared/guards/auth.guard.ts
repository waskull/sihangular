import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): Observable<boolean> {
    let roles: string[] = [];
    return this.authService.user$.pipe((take(1), map((r) => {
      let rr = r;
      roles = rr?.roles || [];
      if(roles.length>0){
        if (roles[0] === 'vendedor') { 
          return false; 
        }
        return true;
      }
      this.router.navigate(['/dashboard']);
      return true;
      
    })
    ));

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

}
