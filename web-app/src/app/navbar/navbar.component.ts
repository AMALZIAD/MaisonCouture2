import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenjson !: any;
  constructor(public readonly  sec: KeycloakSecurityService) {
    this.tokenjson=sec.kc.tokenParsed;console.log(sec.kc.authenticated);
    console.log("id " +sec.kc.token);
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
  }

}
