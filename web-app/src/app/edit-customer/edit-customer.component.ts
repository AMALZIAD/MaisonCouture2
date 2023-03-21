import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer!:Customer
  newCustomerFormGroup !:FormGroup;
  editMesureFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,private customerService:CustomerService) {  }

  ngOnInit(): void {
    //this.customer=this.customerService.getCustomer(this.customer_id);
    this.newCustomerFormGroup=this.fb.group({
      name: this.fb.control(null,[Validators.required, Validators.minLength(4)]),
      email:this.fb.control(null,[Validators.required, Validators.email])
    });
    this.customer = this.newCustomerFormGroup.value;
    this.editMesureFormGroup=this.fb.group({
      tourEpaule: this.fb.control(null,[Validators.required, Validators.maxLength(2)]),
      tourTaille:this.fb.control(null,[Validators.required, Validators.maxLength(2)]),
      hauteur:this.fb.control(null,[Validators.required, Validators.maxLength(3)])
    });

  }

  // update customer data
  handleSaveCustomer(id :number) {
   this.customer.id=id;
    this.customerService.saveCustomer(this.customer).subscribe({
      next: data => {
        alert("Customer has been successfully updated!");
      },
      error: err => {
        console.log(err);
      }
    });
  }
// update Mesure
  handleEditMesure() {
    let mesure = this.editMesureFormGroup.value;
    mesure.customer=this.customer;
    this.customerService.updateMesure(mesure).subscribe({
      next: data => {
        alert("Mesure has been successfully updated!");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
