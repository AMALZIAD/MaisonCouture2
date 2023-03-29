import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {CouturiersComponent} from "./couturiers/couturiers.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {OrdersComponent} from "./orders/orders.component";

const routes: Routes = [
  { path :"customers",component :CustomersComponent},
 { path :"couturiers",component :CouturiersComponent},
  { path :"newcustomer",component :NewCustomerComponent},
  { path :"editcustomer",component :EditCustomerComponent},
  { path :"orders",component :OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
