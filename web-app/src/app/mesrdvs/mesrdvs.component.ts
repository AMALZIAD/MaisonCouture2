import { Component, OnInit } from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {catchError, Observable, throwError} from "rxjs";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mesrdvs',
  templateUrl: './mesrdvs.component.html',
  styleUrls: ['./mesrdvs.component.css']
})
export class MesrdvsComponent implements OnInit {

  mesrdvs!:Observable<Mesrdv[]>;
  errorMessage!:string;
  toCancel!:any;
  constructor(private mesrdvsService:MesrdvService,public sec:KeycloakSecurityService,
              private router :Router) { }

  ngOnInit(): void {
    this.toCancel="PRIS";
    let idkc:string = <string>this.sec.kc.tokenParsed?.sub;
    console.log(idkc);
    if(this.sec.kc.hasRealmRole("CUSTOMER")){
      console.log("im customer")
      this.mesrdvs=this.mesrdvsService.getCustomerRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );

    }else{
      console.log("im couturier")
      this.mesrdvs=this.mesrdvsService.getCouturierRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    }
  }

  newOrder(m: Mesrdv) {
    this.router.navigateByUrl("/neworder/"+JSON.stringify(m));
  }

  cancelRdv(m: Mesrdv) {
    console.log(m)
    this.mesrdvsService.deleteRdv(m.id).subscribe({
      next: data => {
        alert("Rdv has been successfully Deleted!");
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });

  }
}
