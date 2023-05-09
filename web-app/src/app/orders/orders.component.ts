import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {catchError, Observable, throwError} from "rxjs";
import {Order} from "../model/order.model";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!:Observable<Order[]>;
  Oldorders!:Observable<Order[]>;
  errorMessage!:string;

  stOrder = [{i:'CREE',r:'VALIDER'},{i:'VALIDE',r:'TRAITER'},{i:'ENCOURS',r:'TERMINER'},{i:'TERMINE',r:'LIVRER'}];
  /*
      * CREE 0 btn :valide/ or btn annule
      * annule 5 :  annule history
      * VALIDE 1; valide /btn traiter
      * ENCOURS 2: btn TERMINE,
      * Termine 3 : btn LIVRE;
      * LIVRE 4/ : history
      * */
  constructor( private orderService: OrderService,public sec :KeycloakSecurityService) { }

  ngOnInit(): void {
    this.LoadData();
  }
  // charger les donnees!!!!
  LoadData(){
    let idkc = <string>this.sec.kc.tokenParsed?.sub;
    if(this.sec.kc.hasRealmRole("CUSTOMER")){
      this.orders=this.orderService.getCustomerYetOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
      this.Oldorders=this.orderService.getCustomerFinishedOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    }else{//couturier
      this.orders=this.orderService.getCouturierYetOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
      this.Oldorders=this.orderService.getCouturierFinishedOrders(idkc).pipe(
        catchError(err =>{
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
    }
  }

  checkstatus(st:string){
    let res : string="";
    this.stOrder.forEach(s =>{
      if(s.i==st){
        res=s.r;
      }
    });
    return res;
  }
  updateOrder(o:Order,t:any ) {
    let st= t;// status  annule ou 4( livre)
  let stat=""
    if( st == 5){// annule

    }else if(o.status=='TERMINE'){
      st=4;
    }
    else {
      for (let i =0;i<this.stOrder.length;i++){
        console.log("status :"+o.status)
        if (o.status==this.stOrder[i].i){
          st=i+1;
          stat=this.stOrder[i+1].i
        }
      }
    }

    //o.status='ANNULE';
    let order: Order ={id:o.id,typecouture:o.typecouture,categorie:o.categorie,tenue:o.tenue,orderdate:o.orderdate,
      status:st,customer:o.customer,couturier:o.couturier,customerId:o.customerId,couturierId:o.couturierId}
    this.orderService.saveOrder(order).subscribe({
      next: data => {
        console.log("Order has been successfully Updated!");
        this.LoadData();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
