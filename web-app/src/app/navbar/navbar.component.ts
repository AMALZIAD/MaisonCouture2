import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {CouturierService} from "../services/couturier.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenjson !: any;
  couturierId!:number;
  constructor(public readonly  sec: KeycloakSecurityService,private couturierService:CouturierService) {
    this.tokenjson=sec.kc.tokenParsed;console.log(sec.kc.authenticated);
    this.couturierId=0;
    if(this.sec.kc.hasRealmRole('COUTURIER')){
      //get customer ID using backend and idkc
      let idkc: string | undefined  = "";
      idkc=this.sec.kc.tokenParsed?.sub ;
      // get customer data from backend
      if (idkc != null) {
        this.couturierService.getCouturierIdkc(idkc).subscribe({
          next: data => {
            console.log("couturier ",data);
            this.couturierId=data.id;
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
  }

  ngOnInit(): void {

  }

  onLogout() {
    this.sec.kc.logout();
  }
  onLogin() {
    this.sec.kc.login();
  }
  onChangePassword() {
    this.sec.kc.accountManagement();
    // update user  data from token
    console.log(this.sec.kc.tokenParsed)
      //this.sec.kc.a
  }

}
