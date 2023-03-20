import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {Mesure} from "../model/mesure.model";
import {environment} from "../../environments/environment";
import {Couturier} from "../model/couturier.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http:HttpClient) { }

// create account in web site
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.bankendhost+"/CUSTOMER-SERVICE/customers",customer);
  }
  public updateMesure(mesure: Mesure){
    return this.http.put(environment.bankendhost+"/CUSTOMER-SERVICE/mesures",mesure);
  }
// get customer
  public getCustomer(id: number):Observable<Customer>{
    return this.http.get<Customer>(environment.bankendhost+"/CUSTOMER-SERVICE/customers/"+id);
  }
  // get list of couturiers by id customer IN BILLING SERVICE
  public getCouturiersByCustomer(id: number):Observable<Couturier[]>{
    return this.http.get<Couturier[]>(environment.bankendhost+"/BILLING-SERVICE/CouturiersByCustomer/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.couturiers; //just return "couturiers"
      }));
  }
//


  // admin
  public getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/CUSTOMER-SERVICE/customers")
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }

}
