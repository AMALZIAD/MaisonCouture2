import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";
import {Mesrdv} from "../model/mesrdv";
import {ActivatedRoute} from "@angular/router";
import {MesrdvService} from "../services/mesrdv.service";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  newOrderFormGroup!:FormGroup
  rdv!:Mesrdv;
  constructor(private fb:FormBuilder,private serviceOrder:OrderService,private route:ActivatedRoute,
              private rdvService:MesrdvService) {
    this.rdv=JSON.parse(this.route.snapshot.params["rdv"]);
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
    order.status=0;
    order.orderdate=new Date();
    this.serviceOrder.saveOrder(order).subscribe({
      next: data => {
        // set rdv status to TRAITE
        this.rdv.status=4;
        this.rdvService.saveRdv(this.rdv);
        alert("Order has been successfully Created!");
        this.newOrderFormGroup.reset();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
