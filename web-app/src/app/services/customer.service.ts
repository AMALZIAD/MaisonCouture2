import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {Mesure} from "../model/mesure.model";
import {environment} from "../../environments/environment";
import {Couturier} from "../model/couturier.model";
import {KeycloakSecurityService} from "./keycloak-security.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http:HttpClient) { }
//  -----------------KEY CLOCK-------------------------------------------------------------------
  // check if cutomer exist in DB
  public getCustomerIdkc(idkc: string):Observable<boolean>{
    return this.http.get<boolean>(environment.bankendhost+"/CUSTOMER-SERVICE/findByIdkc/"+idkc);
  }

// create account in web site
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.bankendhost+"/CUSTOMER-SERVICE/customers",customer);
  }
  // edit customer
  public editCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.bankendhost+"/CUSTOMER-SERVICE/editCustomer",customer);
  }

  // _______________CUSTOMER SERVICE---------------------------------------------------------------
  // get customer data by idkc
  //ustomer(id=54, name=lamiss, email=lamiss@gmail.com, phone=0606060606, adresse=123 haha rabat, photo=images/lamiss.png,
  // idkc=null, mesure=Mesure(id=16, tourEpaule=80.02, tourTaille=11.0, hauteur=12.45, customer=null))
  public getCustomerByIdkc(idkc: string):Observable<Customer>{
    return this.http.get<Customer>(environment.bankendhost+"/CUSTOMER-SERVICE/CustomerByIdkc/"+idkc);
  }

  // maj les mesures
  public updateMesure(mesure: Mesure){
    /*let walo :any;
    if(this.sec.kc.authenticated){
      return this.http.put(environment.bankendhost+"/CUSTOMER-SERVICE/mesures",mesure);
    }*/
    return this.http.post(environment.bankendhost+"/CUSTOMER-SERVICE/mesures",mesure);;
  }
// get customer by id
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

  // admin--------------------------------ADMIN-------------------------------------------------
  public getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/CUSTOMER-SERVICE/customers")
     /* .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }))*/
      ;
  }

}
