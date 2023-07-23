import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {CouturierService} from "../services/couturier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenjson !: any;
  couturierId!:number;
  constructor(public readonly sec: KeycloakSecurityService,
              private router :Router) {
    this.tokenjson=sec.kc.tokenParsed;console.log(sec.kc.authenticated);

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
    // redirect to change password
    let uri="http://localhost:8080/realms/couture-realm/protocol/openid-connect/auth?client_id=couture-client&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD";
    console.log(uri)
    window.location.href=uri;
  }

}
