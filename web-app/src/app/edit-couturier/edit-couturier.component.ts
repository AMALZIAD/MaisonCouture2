import { Component, OnInit } from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-edit-couturier',
  templateUrl: './edit-couturier.component.html',
  styleUrls: ['./edit-couturier.component.css']
})
export class EditCouturierComponent implements OnInit {

  constructor( private couturierService:CouturierService,sec:KeycloakSecurityService) { }

  ngOnInit(): void {

  }

}
