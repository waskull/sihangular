import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/public/login/login.component'
import { ApplayoutComponent } from './views/private/applayout/applayout.component';
import { DashboardComponent } from './views/private/dashboard/dashboard.component';
import { HomeComponent } from './views/public/home/home.component';
import { SitelayoutComponent } from './views/public/sitelayout/sitelayout.component';
import { UserComponent } from './views/private/user/user.component';
import { ItemComponent } from './views/private/item/item.component';
import { InventoryComponent } from './views/private/inventory/inventory.component';
import { PurchaseComponent } from './views/private/purchase/purchase.component';
import { SaleComponent } from './views/private/sale/sale.component';
import { ReportComponent } from './views/private/report/report.component';
import { ScheduleComponent } from './views/private/schedule/schedule.component';
import { BillComponent } from './views/private/bill/bill.component';
import { ClientComponent } from './views/private/client/client.component';
import { CompanyComponent } from './views/private/company/company.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { UsereditComponent } from './views/private/user/useredit/useredit.component';

const routes: Routes = [
  { 
    path: '', 
    component: SitelayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full'},
    ]
  },
  { 
    path: '',
    component: ApplayoutComponent, 
    children: [
      { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UsereditComponent, canActivate: [AuthGuard] },
      { path: 'clients', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard] },
      { path: 'items', component: ItemComponent, canActivate: [AuthGuard] },
      { path: 'inventory', component: InventoryComponent },
      { path: 'purchases', component: PurchaseComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SaleComponent },
      { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
      { path: 'schedules', component: ScheduleComponent },
      { path: 'bills', component: BillComponent },
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
