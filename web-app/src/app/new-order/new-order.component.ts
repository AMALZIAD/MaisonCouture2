import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  newOrderFormGroup!:FormGroup
  constructor(private fb:FormBuilder,private serviceOrder:OrderService ) { }

  ngOnInit(): void {

    this.newOrderFormGroup=new FormGroup({
      tenue: new FormControl(),
      typecouture:new FormControl(),
      categorie:new FormControl()
    });
  }

  handleSaveOrder() {
    console.log("im here...");
    let order: Order = this.newOrderFormGroup.value;
    console.log("value"+order);

    order.customerId=1;// list customer from rdvn,;bk,bkjb
    order.couturierId=1;// from token
    order.status=0;
    order.orderdate=new Date();
    console.log(order);
    this.serviceOrder.saveOrder(order).subscribe({
      next: data => {
        alert("Order has been successfully updated!");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
