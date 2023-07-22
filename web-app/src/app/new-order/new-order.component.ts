import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";
import {Mesrdv} from "../model/mesrdv.model";
import {ActivatedRoute} from "@angular/router";
import {MesrdvService} from "../services/mesrdv.service";
import {CmdMail} from "../model/cmdmail.model";
import {DatePipe} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import { Customer } from '../model/customer.model';
import {CouturierService} from "../services/couturier.service";
import { Couturier } from '../model/couturier.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  newOrderFormGroup!:FormGroup
  rdv!:Mesrdv;
  pipe = new DatePipe('en-US');
  customer!:Customer;
  couturier!:Couturier;
  constructor(private fb:FormBuilder,private serviceOrder:OrderService,private route:ActivatedRoute,
              private rdvService:MesrdvService,private couturierService:CouturierService,
              private customerService:CustomerService) {
    this.rdv=JSON.parse(this.route.snapshot.params["rdv"]);
    // // get couturier

    this.couturierService.getCouturier(this.rdv.couturierId).subscribe({
      next: data => {
        console.log("couturier ",data);
        this.couturier=data;
      },
      error: err => {
        console.log(err);
      }
    });
     //GET CUSTOMER DATA
    this.customerService.getCustomer(this.rdv.customerId).subscribe({
      next: data => {
        console.log("customer ",data);
        this.customer=data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {

    this.newOrderFormGroup=new FormGroup({
      tenue: new FormControl(),
      typecouture:new FormControl(),
      categorie:new FormControl(),
      amount:new FormControl()
    });
  }

  handleSaveOrder() {
    let order: Order = this.newOrderFormGroup.value;
    order.customerId=this.rdv.customerId;
    order.couturierId=this.rdv.couturierId;
    order.customer=this.customer;
    order.couturier=this.couturier;
    order.status=0;
    order.orderdate=new Date();
    this.serviceOrder.saveOrder(order).subscribe({
      next: data => {
        // set rdv status to TRAITE
        this.rdv.status=4;
        this.rdvService.saveRdv(this.rdv);
        alert("Order has been successfully Created!");
        order.id=data.id
        this.sendEmail(order);
        this.newOrderFormGroup.reset();
      },
      error: err => {
        console.log(err);
      }
    });
  }
  sendEmail(o:Order){
    console.log(o);
    let curr :any = this.pipe.transform(o.orderdate, 'MM-dd-yyyy');
    let details:CmdMail = {
      name: o.customer.name,
      email: o.customer.email,
      datecmd:curr,
      numCmd:o.id.toString(),
      tenue:"Tenue :"+o.tenue+ " en "+o.typecouture +" par couture de " + o.categorie,
      etat:'CREE',
      prix:o.amount.toString(),
      contact:"Nom:"+o.couturier.name +", email :"+o.couturier.email+", tel :"+o.couturier.phone
    };
    console.log(details);
    this.serviceOrder.sendMailMajOrder(details);
  }
}
