import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CustomersComponent } from './customers/customers.component';
import { CouturiersComponent } from './couturiers/couturiers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    CouturiersComponent,
    NewCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
