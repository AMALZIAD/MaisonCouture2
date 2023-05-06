import { Component, OnInit } from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {catchError, Observable, throwError} from "rxjs";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Router} from "@angular/router";
import { Couturier } from '../model/couturier.model';
import {CouturierService} from "../services/couturier.service";

@Component({
  selector: 'app-mesrdvs',
  templateUrl: './mesrdvs.component.html',
  styleUrls: ['./mesrdvs.component.css']
})
export class MesrdvsComponent implements OnInit {

  mesrdvs!:Observable<Mesrdv[]>;
  todays!:Observable<Mesrdv[]>;
  olds!:Observable<Mesrdv[]>;
  errorMessage!:string;
  toCancel!:any;
  constructor(private mesrdvsService:MesrdvService,public sec:KeycloakSecurityService,
              private router :Router,private couturierService :CouturierService) { }

  ngOnInit(): void {
    this.toCancel="PRIS";
    this.fillTable();
  }
 fillTable(){
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
     this.olds=this.mesrdvsService.getCouturierRdvs(idkc).pipe(
       catchError(err =>{
         this.errorMessage=err.message;
         return throwError(err);
       })
     );
     this.todays=this.mesrdvsService.getTodayRdvs(idkc).pipe(
       catchError(err =>{
         this.errorMessage=err.message;
         return throwError(err);
       })
     );
   }
 }
 // new order
  newOrder(m: Mesrdv) {
    this.router.navigateByUrl("/neworder/"+JSON.stringify(m));
  }
  // annuler rdv customer
  cancelRdv(m: Mesrdv) {
    m.status=5;
    console.log(m);
    this.mesrdvsService.saveRdv(m).subscribe({
      next: data => {
        alert("Rdv est bien annulé!");
        // reset tab
        this.fillTable();
      }, error: err => { console.log(err); }
    });
  }
  // annuler conge encours
  cancelConge(m: Mesrdv) {
    console.log(m)
    this.mesrdvsService.deleteRdv(m.id).subscribe({
      next: data => {
        alert("Rdv has been successfully Deleted!");
        this.fillTable();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  declarerConge() {
    let idkc:string = <string>this.sec.kc.tokenParsed?.sub;
    console.log("declarer conge " ,idkc);
    let id:number=-1;
    // get couturier data from backend
    if (idkc != null) {
      this.couturierService.getCouturierIdkc(idkc).subscribe({
        next: data => {
          console.log("couturier ",data);
          id=data.id;
        },
        error: err => {
          console.log(err);
        },complete:()=>{
          console.log("id bd couturier ",id);
          this.router.navigateByUrl("/schedule/"+id);
      }
      });
    }
  }

}
