import { Component, OnInit } from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {catchError, Observable, throwError} from "rxjs";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Router} from "@angular/router";
import { Couturier } from '../model/couturier.model';
import {CouturierService} from "../services/couturier.service";
import {DatePipe} from "@angular/common";
import {Order} from "../model/order.model";

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
  lyom !:any;
  pipe = new DatePipe('en-US');
  constructor(private mesrdvsService:MesrdvService,public sec:KeycloakSecurityService,
              private router :Router,private couturierService :CouturierService) { }

  ngOnInit(): void {
    this.fillTable();
    let curr :string | null ="";
    this.toCancel = this.pipe.transform(new Date(), 'dd-MM-yyyy');
  }
 fillTable(){
   let idkc:string = <string>this.sec.kc.tokenParsed?.sub;
   console.log(idkc);
   if(this.sec.kc.hasRealmRole("CUSTOMER")){
     console.log("im customer")
     this.todays=this.mesrdvsService.getCustomerNewRdvs(idkc).pipe(
       catchError(err =>{
         this.errorMessage=err.message;
         return throwError(err);
       })
     );
     this.olds=this.mesrdvsService.getCustomerOldRdvs(idkc).pipe(
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
    m.status='ANNULE';
    let rdv: Mesrdv ={id:m.id,heure:m.heure,rdvDate:m.rdvDate,status:5,customerId:m.customerId,couturierId:m.couturierId}
    console.log(rdv);
    this.mesrdvsService.saveRdv(rdv).subscribe({
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
