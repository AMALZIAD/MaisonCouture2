import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { CustomersComponent } from './customers/customers.component';
import { CouturiersComponent } from './couturiers/couturiers.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {KeycloakSecurityService} from "./services/keycloak-security.service";
import {RequestInterceptorService} from "./services/request-interceptor.service";
import { OrdersComponent } from './orders/orders.component';
import { CouturierDetailsComponent } from './couturier-details/couturier-details.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { MesrdvsComponent } from './mesrdvs/mesrdvs.component';
import { ScheduleComponent } from './schedule/schedule.component';

function kcFactory(kcSecurity:KeycloakSecurityService) {
  return()=>kcSecurity.init();
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    CouturiersComponent,
    EditCustomerComponent,
    OrdersComponent,
    CouturierDetailsComponent,
    NewOrderComponent,
    MesrdvsComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:APP_INITIALIZER,deps:[KeycloakSecurityService],useFactory:kcFactory,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
