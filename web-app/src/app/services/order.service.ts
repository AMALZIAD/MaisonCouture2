import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Couturier} from "../model/couturier.model";
import {environment} from "../../environments/environment";
import {Customer} from "../model/customer.model";
import {Order} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http:HttpClient) { }

  public saveOrder(order:Order){
    return this.http.post(environment.bankendhost+"/BILLING-SERVICE/orders",order)
  }

  public getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/orders");
     /* .pipe(map((result:any)=>{
        return result._embedded.couturiers; //just return "couturiers"
      }));*/
  }

  // get list of cutomers by id couturier
  public getCustomersByCouturier(id: number):Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/BILLING-SERVICE/CustomersByCouturier/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }
  // GET ORDERS BY CUSTOMER ID
  getCustomerOrders(idkc: string):Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/OrderByCustomer/"+idkc);
    /* .pipe(map((result:any)=>{
       return result._embedded.couturiers; //just return "couturiers"
     }));*/
  }

// GET ORDERS BY COUTURIER ID
  getCouturierOrders(idkc: string) :Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/OrderByCouturier/"+idkc);
    /* .pipe(map((result:any)=>{
       return result._embedded.couturiers; //just return "couturiers"
     }));*/
  }
}
