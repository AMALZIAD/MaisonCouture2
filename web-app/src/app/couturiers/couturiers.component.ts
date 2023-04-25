import { Component, OnInit } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {CouturierService} from "../services/couturier.service";
import {Couturier} from "../model/couturier.model";
import {Router} from "@angular/router";
import {KeycloakSecurityService} from "../services/keycloak-security.service";


@Component({
  selector: 'app-couturiers',
  templateUrl: './couturiers.component.html',
  styleUrls: ['./couturiers.component.css']
})
export class CouturiersComponent implements OnInit {

  couturiers!:Observable<Array<Couturier>>;
  errorMessage!:string;
  constructor(private couturierService: CouturierService,private router :Router
              ,public sec :KeycloakSecurityService) { }

  ngOnInit(): void {
    this.couturiers=this.couturierService.getCouturiers().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  getDetails(c: Couturier) {
    console.log("id cou...",c);
    this.router.navigateByUrl("/couturierdetail/"+c.id);
  }


  schedule(c: Couturier) {
    this.router.navigateByUrl("/schedule/"+c.id);
  }
}
