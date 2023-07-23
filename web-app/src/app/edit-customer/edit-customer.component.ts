import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";

import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {Mesure} from "../model/mesure.model";
import {ActivatedRoute} from "@angular/router";

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
  formDataPic=new FormData();
  customerId!:number;
  constructor(private fb:FormBuilder,private customerService:CustomerService,
              private route:ActivatedRoute,public sec:KeycloakSecurityService) {
    this.customerId=this.route.snapshot.params["id"];

  }
  ngOnInit(): void {
    if(this.customerId!=0){
      this.customerService.getMesure(this.customerId).subscribe({
        next: data => {
          console.log("mesure loaded ",data);
          // initialze Customer global with retrived data
          this.mesure=data;
          //initialize form with retrived data
          this.initializeFormMesure();
        },
        error: err => {
          console.log(err);
        }
      });
      /*this.customerService.getCustomer(this.customerId).subscribe({
        next: data => {
          console.log("customer ",data);
          // initialze Customer global with retrived data
          this.customer=data;
          //initialize form with retrived data
          this.initializeFormMesure();
        },
        error: err => {
          console.log(err);
        }
      });*/
    }else{
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
            this.initializeFormProfile();
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
  }
// initialze form with backend data
  initializeFormProfile(){
    // initialise inputs in the form with control
    //------------------CUSTOMER------------------------
    this.newCustomerFormGroup=this.fb.group({
      adresse: this.fb.control(this.customer.adresse,[Validators.required, Validators.minLength(4)]),
      phone:this.fb.control(this.customer.phone,[Validators.required, Validators.maxLength(10)])
    });
  }
  initializeFormMesure(){
    //--------------------MESURE---------------------------
    console.log('hello from mesure init')
    this.editMesureFormGroup=this.fb.group({
      tourEpaule: this.fb.control(this.mesure.tourEpaule,[Validators.required, Validators.maxLength(2)]),
      tourTaille:this.fb.control(this.mesure.tourTaille,[Validators.required, Validators.maxLength(2)]),
      hauteur:this.fb.control(this.mesure.hauteur,[Validators.required, Validators.maxLength(3)])
    });
  }
  // update customer data
  handleSaveCustomer() {
    let cust: Customer = this.newCustomerFormGroup.value;
    cust.id=this.customer.id;
    cust.mesure=this.customer.mesure
    cust.idkc=this.customer.idkc
    cust.email=this.customer.email;
    cust.name=this.customer.name;
    cust.photo="assets/profile/profilCust"+this.customer.id+".png";
    this.customerService.editCustomer(cust).subscribe({
      next: data => {
        alert("Customer has been successfully updated!");
      },
      error: err => {
        console.log(err);
      }
    });
    // upload photo to the server
    this.customerService.upload(this.formDataPic).subscribe(
      event =>{
        console.log("Photo Profil sauvegardé !");
      },
      (error)=>{
        console.log(error)
      }
    );
  }
// update Mesure
  handleEditMesure() {
    console.log("hello from mesure")
    // get mesure data from Form
    let mesure =this.editMesureFormGroup.value;
    // get mesure id from customer global data
    console.log("mesue id:"+this.mesure.id)
    mesure.id =this.mesure.id;

    console.log(mesure)
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

  //upload photo profile
  onUploadPhoto(event: Event) {
    const target = event!.target as HTMLInputElement;
    let files :FileList | null;
    if(target.files){
      files=target.files;

      // @ts-ignore
      for(const file of files){
        this.formDataPic.append("files", file,"profilCust"+this.customer.id+".png");
      }

    }
  }
}
