import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from "./customer/customer.component";
import {CouturierComponent} from "./couturier/couturier.component";
import {MesrdvComponent} from "./mesrdv/mesrdv.component";

const routes: Routes = [
  { path :"customer",component :CustomerComponent},
  { path :"couturier",component :CouturierComponent},
  { path :"mesrdv",component :MesrdvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
