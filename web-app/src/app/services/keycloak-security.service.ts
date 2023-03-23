import { Injectable } from '@angular/core';
import {KeycloakInstance} from "keycloak-js";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerService} from "./customer.service";

declare var Keycloak:any;

@Injectable({ providedIn: 'root'})
export class KeycloakSecurityService {
  public kc!:KeycloakInstance;
  constructor(private http:HttpClient,private customerService:CustomerService) {}
  async init() {
    console.log("Security Initialized!");
    this.kc = new Keycloak({
      url: "http://localhost:8080/",
      realm: "couture-realm",
      clientId: "couture-client"
    });
    try {
      await this.kc.init({
        onLoad: "check-sso"
      });
      console.log("Initialise" +this.kc.token)
      this. customerData();
    }
    catch (e) {
      this.kc.login();
    }

  }
  customerData(){
    console.log("customer data !????" );
    // create account in web site
    if (this.kc.authenticated){
      let sub = <string>this.kc.tokenParsed?.sub

    /*  let customer: Customer = {
        id: 0,
        name: "amal2",
        email: "amal@live.fr",
        idck :sub
      };
      console.log("customer interface ",customer);*/

      let cust = this.customerService.getCustomerIdkc(sub).forEach((data: Customer) => {
        console.log(data);
      });
      console.log("sub :",JSON.stringify(cust))

      /*console.log("customer saving!!!!!");
      this.customerService.saveCustomer(customer).subscribe();
      console.log("customer saved");*/
    }


  }

}
