import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";

import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Mesure} from "../model/mesure.model";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer!:Customer
  mesure!:Mesure
  newCustomerFormGroup !:FormGroup;
  editMesureFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,private customerService:CustomerService,
              private sec:KeycloakSecurityService) {  }

  ngOnInit(): void {
    // get Customer idkc from Token
    let idkc: string | undefined  = "";
    idkc=this.sec.kc.tokenParsed?.sub ;
    // get customer data from backend
    if (idkc != null) {
      this.customerService.getCustomerByIdkc(idkc).subscribe({
        next: data => {
          console.log("customer ",data);
          // initialze Customer global with retrived data
          this.customer=data;
          //initialize form with retrived data
          this.initializeForm(data);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
// initialze form with backend data
  initializeForm(customer:Customer){
    // initialise inputs in the form with control
    //------------------CUSTOMER------------------------
    this.newCustomerFormGroup=this.fb.group({
      name: this.fb.control(customer.name,[Validators.required, Validators.minLength(4)]),
      email:this.fb.control(customer.email,[Validators.required, Validators.email])
    });
    //--------------------MESURE---------------------------
    this.editMesureFormGroup=this.fb.group({
      tourEpaule: this.fb.control(customer.mesure.tourEpaule,[Validators.required, Validators.maxLength(2)]),
      tourTaille:this.fb.control(customer.mesure.tourTaille,[Validators.required, Validators.maxLength(2)]),
      hauteur:this.fb.control(customer.mesure.hauteur,[Validators.required, Validators.maxLength(3)])
    });
  }
  // update customer data
  handleSaveCustomer() {
    let cust: Customer = this.newCustomerFormGroup.value;
    cust.id=this.customer.id;
    cust.mesure=this.customer.mesure
    cust.idkc=this.customer.idkc
    this.customerService.editCustomer(cust).subscribe({
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
    // get mesure data from Form
    let mesure =this.editMesureFormGroup.value;
    // get mesure id from customer global data
    mesure.id =this.customer.mesure.id;
    // save mesure update
    this.customerService.updateMesure( mesure).subscribe({
      next: data => {
        alert("Mesure has been successfully updated!");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
