import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {catchError, Observable, throwError} from "rxjs";
import {Order} from "../model/order.model";
import {CmdMail} from "../model/cmdmail.model";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {environment} from "../../environments/environment";
import {DatePipe} from "@angular/common";
declare let Email: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  pipe = new DatePipe('en-US');
  orders:Order []= [];
  Oldorders:Order []= [];
  totalEleNew: number = 0;
  totalEleOld: number = 0;
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
      this.getAllCust(idkc,{ page: "0", size: "2" },0);
      this.getAllCust(idkc,{ page: "0", size: "2" },1);
    }else{//couturier
      this.getAllCout(idkc,{ page: "0", size: "2" },0);
      this.getAllCout(idkc,{ page: "0", size: "2" },1);
    }
  }
  //get all data --------------------------------------

  //pagination customer---------------------------------
    getAllCust(idkc:string,request:any,status:number){
      console.log("helo from Cust")
      //--------------------------------------------------------------
      if(status==0){
        this.orderService.getCustomerFinishedOrders(idkc,request).subscribe(data => {
            this.Oldorders = data['content'];
            this.totalEleOld = data['totalElements'];
            console.log("total eles:"+this.totalEleOld);
            console.log(this.Oldorders)
          }
          , error => {
            console.log(error.error.message);
          }
        );
      }else {
        this.orderService.getCustomerYetOrders(idkc,request).subscribe(data => {
            this.orders = data['content'];
            this.totalEleNew = data['totalElements'];
            console.log("total eles:"+this.totalEleNew);
            console.log(this.orders)
          }
          , error => {
            console.log(error.error.message);
          }
        );
      }
    }

    // pagination couturier
    getAllCout(idkc:string,request:any,status:number){
    console.log("helo from Cout")
    //--------------------------------------------------------------
    if(status==0){
      this.orderService.getCouturierFinishedOrders(idkc,request).subscribe(data => {
          this.Oldorders = data['content'];
          this.totalEleOld = data['totalElements'];
          console.log("total eles:"+this.totalEleOld);
          console.log(this.Oldorders)
        }
        , error => {
          console.log(error.error.message);
        }
      );
    }else {
      this.orderService.getCouturierYetOrders(idkc,request).subscribe(data => {
          this.orders = data['content'];
          this.totalEleNew = data['totalElements'];
          console.log("total eles:"+this.totalEleNew);
          console.log(this.orders)
        }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }


  // next page----------------------------------------------
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

// check status -----------------------------------
  checkstatus(st:string){
    let res : string="";
    this.stOrder.forEach(s =>{
      if(s.i==st){
        res=s.r;
      }
    });
    return res;
  }

// update order -----------------------------------
  updateOrder(o:Order,t:any ) {
    let st= t;// status  annule ou 4( livre)
  let stat=""
    if( st == 5){// annule
      o.status='ANNULE';
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
     amount:o.amount, status:st,customer:o.customer,couturier:o.couturier,customerId:o.customerId,couturierId:o.couturierId}
    this.orderService.saveOrder(order).subscribe({
      next: data => {
        console.log("Order has been successfully Updated!");
        this.LoadData();
        console.log(o.status)
        this.sendEmail(order,stat);
      },
      error: err => {
        console.log(err);
      }
    });
  }

// send email confirmation---------------------------------
  sendEmail(o:Order,t :any){

    let curr :any = this.pipe.transform(o.orderdate, 'MM-dd-yyyy');
    let details:CmdMail = {
      name: o.customer.name,
      email: o.customer.email,
      datecmd:curr,
      numCmd:o.id.toString(),
      tenue:"Tenue :"+o.tenue+ " en "+o.typecouture +" par couture de " + o.categorie,
      etat:t,
      prix:o.amount.toString(),
      contact:"Nom:"+o.couturier.name +", email :"+o.couturier.email+", tel :"+o.couturier.phone
    };
    this.orderService.sendMailMajOrder(details);
  }
}
