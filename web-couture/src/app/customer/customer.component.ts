import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:Observable<Array<Customer>>;
  errorMessage!:string;
  searchformGroup!:FormGroup;

  constructor(private customerService:CustomerService, private fb:FormBuilder,
                private router : Router) { }

  ngOnInit(): void {
    // search form
    this.searchformGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handleSearchCustomers();
  }


  handleDeleteCustomer(c: Customer) {

    this.customerService.updateCustomer(c).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }
  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }



}
