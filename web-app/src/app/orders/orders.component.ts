import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {catchError, Observable, throwError} from "rxjs";
import {Order} from "../model/order.model";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!:Observable<Order[]>;
  errorMessage!:string;

  constructor( private orderService: OrderService,private sec :KeycloakSecurityService) { }

  ngOnInit(): void {
    let idkc = <string>this.sec.kc.tokenParsed?.sub;
    if(this.sec.kc.hasRealmRole("CUSTOMER")){
      this.orders=this.orderService.getCustomerOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    }else{
      this.orders=this.orderService.getCouturierOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    }
  }
}
