import { Component, OnInit } from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv.model";
import {catchError, Observable, throwError} from "rxjs";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Router} from "@angular/router";
import {CouturierService} from "../services/couturier.service";
import {DatePipe} from "@angular/common";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mesrdvs',
  templateUrl: './mesrdvs.component.html',
  styleUrls: ['./mesrdvs.component.css']
})
export class MesrdvsComponent implements OnInit {

  userrole="";
  mesrdvs!:Observable<Mesrdv[]>;
  todays:Mesrdv[]= [];
  olds:Mesrdv[]= [];
  errorMessage!:string;
  toCancel!:any;
  lyom =new Date();
  pipe = new DatePipe('en-US');
  totalEleNew: number = 0;
  totalEleOld: number = 0;

  constructor(private mesrdvsService:MesrdvService,public sec:KeycloakSecurityService,
              private router :Router,private couturierService :CouturierService) { }

  //on init fill the tables with rdvs old and new
  ngOnInit(): void {

    // fill the tables
    this.fillTable();
    let curr :string | null ="";
    this.toCancel = this.pipe.transform(new Date(), 'dd-MM-yyyy');
  }
  //fill the table function
 fillTable(){
   let idkc:string = <string>this.sec.kc.tokenParsed?.sub;
   console.log(idkc);
   // if its customer
   if(this.sec.kc.hasRealmRole("CUSTOMER")){
     console.log("im customer")
     /*  this.todays=this.mesrdvsService.getCustomerNewRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      )    /* this.olds=this.mesrdvsService.getCustomerOldRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );*/
     this.getAllCust(idkc,{ page: "0", size: "2" },0);
     this.getAllCust(idkc,{ page: "0", size: "2" },1);

   }else{
     console.log("im couturier")
     /* this.todays=this.mesrdvsService.getTodayRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    /*this.olds=this.mesrdvsService.getCouturierRdvs(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );*/
     console.log(idkc);
      this.getAllCout(idkc,{ page: "0", size: "2" },0);
     this.getAllCout(idkc,{ page: "0", size: "2" },1);
     //-------------------------------------------------------------------

   }
 }
 // new order
  newOrder(m: Mesrdv) {
    this.router.navigateByUrl("/neworder/"+JSON.stringify(m));
  }
  // annuler rdv customer
  cancelRdv(m: Mesrdv) {
    m.status='ANNULE';
    let rdv: Mesrdv ={id:m.id,heure:m.heure,rdvDate:m.rdvDate,status:5,
      customerId:m.customerId,couturierId:m.couturierId,
      customer:m.customer,couturier:m.couturier}
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
// pagination couturier
  getAllCout(idkc:string,request:any,status:number){
    console.log("helo from Cout")
    //--------------------------------------------------------------
     if(status==0){
       this.mesrdvsService.getOldRdvCouturier(idkc,request).subscribe(data => {
           this.olds = data['content'];
           this.totalEleOld = data['totalElements'];
           console.log("total eles:"+this.totalEleOld);
           console.log(this.olds)
         }
         , error => {
           console.log(error.error.message);
         }
       );
     }else {
       this.mesrdvsService.getNewRdvCouturier(idkc,request).subscribe(data => {
           this.todays = data['content'];
           this.totalEleNew = data['totalElements'];
           console.log("total eles:"+this.totalEleNew);
           console.log(this.todays)
         }
         , error => {
           console.log(error.error.message);
         }
       );
     }
  }
  //pagination customer------------------------------------------------
  getAllCust(idkc:string,request:any,status:number){
    console.log("helo from Cust")
    //--------------------------------------------------------------
    if(status==0){
      this.mesrdvsService.getCustomerOldRdvs(idkc,request).subscribe(data => {
          this.olds = data['content'];
          this.totalEleOld = data['totalElements'];
          console.log("total eles:"+this.totalEleOld);
          console.log(this.olds)
        }
        , error => {
          console.log(error.error.message);
        }
      );
    }else {
      this.mesrdvsService.getCustomerNewRdvs(idkc,request).subscribe(data => {
          this.todays = data['content'];
          this.totalEleNew = data['totalElements'];
          console.log("total eles:"+this.totalEleNew);
          console.log(this.olds)
        }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }
  nextPage(event: any,st:number) {
    let idkc:string = <string>this.sec.kc.tokenParsed?.sub;
    const request = {page:'',size:''};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    if(this.sec.kc.hasRealmRole("CUSTOMER")){
      this.getAllCust(idkc,request,st);
    }else{
      this.getAllCout(idkc,request,st);
    }

  }
}
