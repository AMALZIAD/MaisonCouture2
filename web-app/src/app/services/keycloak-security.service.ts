import { Injectable } from '@angular/core';
import {KeycloakInstance} from "keycloak-js";

declare var Keycloak:any;

@Injectable({ providedIn: 'root'})
export class KeycloakSecurityService {
  public kc!:KeycloakInstance;
  constructor() {}
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
    }
    catch (e) {
      this.kc.login();
    }

  }

}
