import { Injectable } from '@angular/core';
import {Customer} from "../model/customer.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers() :Observable<Array<Customer > >{
    return this.http.get<Array<Customer>>(environment.bankendhost+"/customers")
  }
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.bankendhost+"/customers",customer);
  }
  public updateCustomer(customer: Customer){
    return this.http.put(environment.bankendhost+"/customers/",customer);
  }
}
