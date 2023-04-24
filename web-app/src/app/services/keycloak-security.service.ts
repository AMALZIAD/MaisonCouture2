import { Injectable } from '@angular/core';
import {KeycloakInstance} from "keycloak-js";
import {Customer} from "../model/customer.model";
import {Couturier} from "../model/couturier.model";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "./customer.service";
import {CouturierService} from "./couturier.service";

declare var Keycloak:any;

@Injectable({ providedIn: 'root'})
export class KeycloakSecurityService {
  public kc!:KeycloakInstance;
  constructor(private http:HttpClient,private customerService:CustomerService
              ,private couturierService:CouturierService) {}
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
      this.Usersign();
    }
    catch (e) {
      this.kc.login();
    }

  }
  Usersign(){
    console.log("customer data !" );
    // si user est authetifie
    if (this.kc.authenticated) {
      // recupere la zone role
      let role = this.kc?.tokenParsed?.['kcrole'];
      console.log("customer kcrole " + role);
      // si le role est rempli
      if (role == "CUSTOMER") {
        //  create customer object from token
        const customer: Customer = {
          id: 0, idkc: <string>this.kc.tokenParsed?.sub, name: this.kc?.tokenParsed?.['name'],
          email: this.kc?.tokenParsed?.['email'],mesure :{hauteur:0, id:0,tourTaille:0,tourEpaule:0}
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
      if (role == "COUTURIER") {
        //  create customer object from token
         const couturier: Couturier = {
          id: 0, idkc: <string>this.kc.tokenParsed?.sub, name: this.kc?.tokenParsed?.['name'],
          email: this.kc?.tokenParsed?.['email'],photo :"",profile:"",gallery:[]
        }
        console.log(couturier);
        // save new customer to db
        this.couturierService.saveCouturier(couturier).subscribe({
          next: data => {
            console.log("Couturier has been successfully saved!");
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
  }


}
