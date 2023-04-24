import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {CouturiersComponent} from "./couturiers/couturiers.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {OrdersComponent} from "./orders/orders.component";
import {CouturierDetailsComponent} from "./couturier-details/couturier-details.component";
import {NewOrderComponent} from "./new-order/new-order.component";
import {MesrdvsComponent} from "./mesrdvs/mesrdvs.component";
import {ScheduleComponent} from "./schedule/schedule.component";

const routes: Routes = [
  { path :"customers",component :CustomersComponent},
 { path :"couturiers",component :CouturiersComponent},
  { path :"editcustomer",component :EditCustomerComponent},
  { path :"orders",component :OrdersComponent},
  { path :"neworder",component :NewOrderComponent},
  { path :"neworder/:rdv",component :NewOrderComponent},
  { path :"mesrdvs",component :MesrdvsComponent},
  { path :"couturierdetail/:id",component :CouturierDetailsComponent},
  { path :"schedule",component :ScheduleComponent},
  { path :"schedule/:id",component :ScheduleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
