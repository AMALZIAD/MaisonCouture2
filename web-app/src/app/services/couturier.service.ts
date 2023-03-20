import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {HttpClient} from "@angular/common/http";
import {Couturier} from "../model/couturier.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CouturierService {


  constructor(private http:HttpClient) { }

  public getCouturiers():Observable<Couturier[]>{
    return this.http.get<Couturier[]>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers")
      .pipe(map((result:any)=>{
        return result._embedded.couturiers; //just return "couturiers"
      }));
  }
  // get list of cutomers by id couturier
  public getCustomersByCouturier(id: number):Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/BILLING-SERVICE/CustomersByCouturier/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }
}
