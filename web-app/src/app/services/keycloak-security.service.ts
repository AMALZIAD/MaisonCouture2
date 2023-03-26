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
      this.customersign();
    }
    catch (e) {
      this.kc.login();
    }

  }
  customersign(){
    console.log("customer data !" );
    // si user est authetifie
    if (this.kc.authenticated) {
      // recupere la zone role
      let role = this.kc?.tokenParsed?.['kcrole'];
      console.log("customer kcrole " + role);
      // si le role est rempli
      if (role != "") {
        //  create customer object from token
        const customer: Customer = {
          id: 0, idkc: <string>this.kc.tokenParsed?.sub, name: this.kc?.tokenParsed?.['name'],
          email: this.kc?.tokenParsed?.['email']
        }
        console.log(customer);
        // save new customer to db
        this.customerService.saveCustomer(customer).subscribe({
          next: data => {
            console.log("Customer has been successfully saved!");
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
    }

  /*customerData(){
    console.log("customer data !" );
   // si user est authetifie
    if (this.kc.authenticated){
      // recupere la zone role
      let  role =this.kc?.tokenParsed?.['kcrole'];
      console.log("customer kcrole "+role);
      // si le role est vide alors on fait rien
      if( role != "" ){
        // get the id kc from token
        let sub = <string>this.kc.tokenParsed?.sub
        console.log(sub);
       // check if exist and assign role
        this.customerService.getCustomerIdkc(sub).forEach((data: boolean) => {
          console.log("boolean : " ,data);
          if (!data){
            // if it dosnt exit create customer object from token
            const customer: Customer = { id: 0, idkc: sub,name:this.kc?.tokenParsed?.['name'],
              email:this.kc?.tokenParsed?.['email'] };
            console.log(customer);
            // save new customer to db
            this.customerService.saveCustomer(customer).subscribe({
              next:data=>{
                console.log("Customer has been successfully saved!");
              },
              error: err=>{
                console.log(err);
              }
            });
          }
        });
      }else {
        console.log(" im empty")
      }

    }

  }*/

}
