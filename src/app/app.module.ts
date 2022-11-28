import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/public/home/home.component';
import { DashboardComponent } from './views/private/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SitelayoutComponent } from './views/public/sitelayout/sitelayout.component';
import { ApplayoutComponent } from './views/private/applayout/applayout.component';
import { TableComponent } from './shared/components/table/table.component';
import { LoginComponent } from './views/public/login/login.component';
import { AuthService } from './shared/services/auth/auth.service';
import { InterceptorService } from './shared/interceptors/interceptor.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { UserComponent } from './views/private/user/user.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { ItemComponent } from './views/private/item/item.component';
import { SaleComponent } from './views/private/sale/sale.component';
import { PurchaseComponent } from './views/private/purchase/purchase.component';
import { ReportComponent } from './views/private/report/report.component';
import { BillComponent } from './views/private/bill/bill.component';
import { ScheduleComponent } from './views/private/schedule/schedule.component';
import { InventoryComponent } from './views/private/inventory/inventory.component';
import { ClientComponent } from './views/private/client/client.component';
import { CompanyComponent } from './views/private/company/company.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { UserformComponent } from './shared/components/userform/userform.component';
import { ClientformComponent } from './shared/components/clientform/clientform.component';
import { CompanyFormComponent } from './shared/components/company-form/company-form.component';
import { ItemformComponent } from './shared/components/itemform/itemform.component';
import { InventoryformComponent } from './shared/components/inventoryform/inventoryform.component';
import { BillformComponent } from './shared/components/billform/billform.component';
import { SaleformComponent } from './shared/components/saleform/saleform.component';
import { PurchaseformComponent } from './shared/components/purchaseform/purchaseform.component';
import { ScheduleformComponent } from './shared/components/scheduleform/scheduleform.component';
import { ReportgeneratorComponent } from './shared/components/reportgenerator/reportgenerator.component';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { UsereditComponent } from './views/private/user/useredit/useredit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    SitelayoutComponent,
    ApplayoutComponent,
    TableComponent,
    LoginComponent,
    FilterPipe,
    UserComponent,
    AppHeaderComponent,
    ItemComponent,
    SaleComponent,
    PurchaseComponent,
    ReportComponent,
    BillComponent,
    ScheduleComponent,
    InventoryComponent,
    ClientComponent,
    CompanyComponent,
    ModalComponent,
    UserformComponent,
    ClientformComponent,
    CompanyFormComponent,
    ItemformComponent,
    InventoryformComponent,
    BillformComponent,
    SaleformComponent,
    PurchaseformComponent,
    ScheduleformComponent,
    ReportgeneratorComponent,
    NotfoundComponent,
    UsereditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DpDatePickerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },AuthService, DatePipe, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
