import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  navData = [
    {
      number: '1',
      routeLink: 'dashboard',
      icon: 'bi bi-house-heart',
      label: 'Dashboard',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '2',
      routeLink: 'users',
      icon: 'bi bi-people',
      label: 'Usuario',
      roles: ['admin', 'gerente']
    },
    {
      number: '3',
      routeLink: 'clients',
      icon: 'bi bi-people',
      label: 'Clientes',
      roles: ['admin', 'gerente']
    },
    {
      number: '4',
      routeLink: 'companies',
      icon: 'bi bi-people',
      label: 'Compañias',
      roles: ['admin', 'gerente']
    },
    {
      number: '5',
      routeLink: 'items',
      icon: 'fa-solid fa-utensils',
      label: 'Articulos',
      roles: ['admin', 'gerente']
    },
    {
      number: '6',
      routeLink: 'inventory',
      icon: 'fa-solid fa-list',
      label: 'Inventario',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '7',
      routeLink: 'schedules',
      icon: 'bi bi-calendar-week',
      label: 'Cronograma',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '8',
      routeLink: 'purchases',
      icon: 'fa-solid fa-basket-shopping',
      label: 'Compras',
      roles: ['admin', 'gerente']
    },
    {
      number: '9',
      routeLink: 'sales',
      icon: 'bi bi-bag',
      label: 'Ventas',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '10',
      routeLink: 'bills',
      icon: 'bi bi-bag-check',
      label: 'Facturas',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '11',
      routeLink: 'reports',
      icon: 'fa-solid fa-file-invoice',
      label: 'Reportes',
      roles: ['admin', 'gerente']
    },
  ];
  public userData!: User;
  constructor(private readonly authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe(res => {
      if (res.roles.includes('vendedor')) {
        this.navData = [
          {
            number: '1',
            routeLink: 'dashboard',
            icon: 'bi bi-house-heart',
            label: 'Dashboard',
            roles: ['admin', 'gerente', 'vendedor']
          },
          {
            number: '2',
            routeLink: 'inventory',
            icon: 'fa-solid fa-list',
            label: 'Inventario',
            roles: ['admin', 'gerente', 'vendedor']
          },
          {
            number: '3',
            routeLink: 'schedules',
            icon: 'bi bi-calendar-week',
            label: 'Cronograma',
            roles: ['admin', 'gerente', 'vendedor']
          },
          {
            number: '4',
            routeLink: 'sales',
            icon: 'bi bi-bag',
            label: 'Ventas',
            roles: ['admin', 'gerente', 'vendedor']
          },
          {
            number: '5',
            routeLink: 'bills',
            icon: 'bi bi-bag-check',
            label: 'Facturas',
            roles: ['admin', 'gerente', 'vendedor']
          }
        ];
      }
      this.userData = res;
    });
  }
  getLastname():string | undefined{
    return this.authService.getData()?.lastname;
  }
  getFirstname():string | undefined{
    return this.authService.getData()?.firstname;
  }
  getRoles():string | undefined{
    return this.authService.getData()?.roles[0];
  }
  getLT1(){
    return this.authService.getData()?.firstname.at(0);
  }
  getLT2(){
    return this.authService.getData()?.lastname.at(0);
  }
  logout(){
    this.authService.Logout().subscribe(res => {
      this.authService.setUsuario({
        id:-1,
        email:'',
        firstname:'',
        lastname:'',
        cedula:'',
        phone:'',
        age:0,
        roles:['']
      });
    });
    this.router.navigateByUrl('/login');
  }
  public editUser():void {
    
  }
  edit(user:any){
    
  }
}
