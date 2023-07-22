import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Couturier} from "../model/couturier.model";
import {environment} from "../../environments/environment";
import {Customer} from "../model/customer.model";
import {Order} from "../model/order.model";
import { CmdMail } from '../model/cmdmail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http:HttpClient) { }

  // save 1 order----------------------------------------------------------------------------------------
  public saveOrder(order:Order):Observable<Order>{
    return this.http.post<Order >(environment.bankendhost+"/BILLING-SERVICE/orders",order)
  }
  // get all orders---------------------------------------------------------------------------------------
  public getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/orders");
  }

  // get list of cutomers by id couturier----------------------------------------------------------------
  public getCustomersByCouturier(id: number):Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/BILLING-SERVICE/CustomersByCouturier/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }
  // GET ORDERS BY CUSTOMER ID ----------------------------------------------------------------------------
  getCustomerFinishedOrders(idkc: string):Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/FinishedOrderByCustomer/"+idkc);
  }
  getCustomerYetOrders(idkc: string):Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/YetOrderByCustomer/"+idkc);
  }


// GET ORDERS BY COUTURIER IDKC------------------------------------------------------------------------------
  // finished
  getCouturierFinishedOrders(idkc: string) :Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/FinishedOrderByCouturier/"+idkc);
    /* .pipe(map((result:any)=>{
       return result._embedded.couturiers; //just return "couturiers"
     }));*/
  }
 // encours
  getCouturierYetOrders(idkc: string) :Observable<Order[]> {
    return this.http.get<Order[]>(environment.bankendhost+"/BILLING-SERVICE/YetOrderByCouturier/"+idkc);
    /* .pipe(map((result:any)=>{
       return result._embedded.couturiers; //just return "couturiers"
     }));*/
  }
  //send email maj cmd
  sendMailMajOrder(details:CmdMail){
    this.http.post<CmdMail>(environment.bankendhost+
      "/BILLING-SERVICE/mailCmd", details).subscribe(
      res => {
        details= res;
        console.log(details);
        alert('Email Sent successfully');
      });
  }
}
