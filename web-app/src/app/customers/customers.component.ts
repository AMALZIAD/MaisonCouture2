import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:Observable<Array<Customer>>;
  errorMessage!:string;

  constructor(private customerService: CustomerService,
                       private route:Router ) { }

  ngOnInit(): void {
    this.customers=this.customerService.getCustomers().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.customers.forEach((data: Customer[]) => {
      console.log("boolean : ", data);
    });
  }

  updateMesure(c: Customer) {
    this.route.navigateByUrl("/editcustomer/"+c.id);
  }
}
