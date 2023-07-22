import {Component,OnInit,} from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv.model";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {RdvMail} from "../model/rdvmail.model";
import { Customer } from '../model/customer.model';
import {CouturierService} from "../services/couturier.service";
import { Couturier } from '../model/couturier.model';
declare let Email: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  errorMessage!:string;
  mesrdvs :Array<any>=[];
  currents :Array<any>=[];
  days:Array<Date> = [];
  pipe = new DatePipe('en-US');
  times :Array<string> =["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30"];
  rdv :any;
  couturierId!:number;
  customerId!:number;
  customer!:Customer;
  couturierIdkc!:string;
  conges :Array<any>=[];
  adressMail="";
  couturier!:Couturier;
  constructor(private rdvService:MesrdvService,private route:ActivatedRoute ,
              private customerService :CustomerService,
              private couturierService :CouturierService
              ,public  sec:KeycloakSecurityService) {
   //get couturier id from route(clickedlink )
    this.couturierId=route.snapshot.params['id'];
     console.log(this.couturierId);
    this.couturierService.getCouturier(this.couturierId).subscribe({
      next: (data: any) => {
        console.log("couturier ",data);
        this.couturier=data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    }

  ngOnInit(): void {
    if(this.sec.kc.hasRealmRole('CUSTOMER')){
      //get customer ID using backend and idkc
      let idkc: string | undefined  = "";
      idkc=this.sec.kc.tokenParsed?.sub ;
      // get customer data from backend
      if (idkc != null) {
        this.customerService.getCustomerByIdkc(idkc).subscribe({
          next: data => {
            console.log("customer ",data);
            this.customerId=data.id;
            this.adressMail=data.email;
            this.customer=data;
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }

    // get 2 weeks days table header
    var curr = new Date();
    for (let i=0;i<13;i++){
      // let day=new Date(curr.setDate(curr.getDate() - curr.getDay()+i));
      let day=new Date(curr.setDate(curr.getDate()+1))
      this.days.push(day);
    }
   // fill tableau
    this.fillTab();
  }
 fillTab(){
   // get couturier curennt taken rdvs -----------------------------------------------------------
   this.rdvService.getCurrentRdvs(this.couturierId).subscribe(value => {
       this.currents.push(value);
     },error => {},
     ()=>{
       this.times.forEach(time=>{
         let jour:Array<any>=[];
         this.days.forEach(day=>{
           let curr :string | null ="";
           curr = this.pipe.transform(day, 'MM-dd-yyyy');
           // create object
           let obj={h:time,j:day,s:this.rdvcheck(time,curr)}

           jour.push(obj);
         })
         this.mesrdvs.push(jour);
       });
     });
 }
  rdvcheck(h: string, d: string | null):number | null{
    let status :number =0;
    this.currents.forEach(current=>{
      current.forEach((c: { rdvDate: string | number | Date; heure: string;status:number })=>{
        let curr :string | null ="";
        curr = this.pipe.transform(c.rdvDate, 'MM-dd-yyyy');
        if (c.heure==h){
          if(curr==d){
            status=c.status;
           /* if(status==5){            //change status canceled
              status=0;console.log("status from 5 "+status)
            }*/
          }
        }
      });
    });
    return status;
  }
fillData():boolean{
  this.times.forEach(time=>{
    let jour:Array<any>=[];
    this.days.forEach(day=>{
      let curr :string | null ="";
      curr = this.pipe.transform(day, 'MM-dd-yyyy');
      console.log("test  "+this.rdvcheck(time,curr));
      // create object
      let obj={h:time,j:day,s:this.rdvcheck(time,curr)}
      jour.push(obj);
    })
    this.mesrdvs.push(jour);
  });
  return true;
}
  // validate rdv -CUSTOMER---------------------------------------------------
  valideRdv(event:any) {

    // get only buttons clicked
    if(event.target.localName=="button"){
      // get the time end date
      var heure = event.target.innerHTML;
      var date = event.target.name;
      //check if customer
      if(this.sec.kc.hasRealmRole('CUSTOMER')){

        //save it to BD
        let rdvDate=new Date(new Date(date).setHours(0, 0, 0, 0));
        this.rdv={id:0,rdvDate:rdvDate,heure:heure,
          customerId:this.customerId,couturierId:this.couturierId,
          status:1,customer:this.customer,couturier:this.couturier};
        console.log(this.rdv)
        this.rdvService.saveRdv(this.rdv).subscribe({
          next: data => {
            alert("Rdv est bien enregistré!");
            // reset tab
            this.mesrdvs=[];
            this.fillTab();
            this.sendEmail(this.rdv);
          }, error: err => { console.log(err); }
        });
        // msg affichage
        console.log("votre rdv est : "+ date +" à "+heure);
      }
      else{// is couturier
        //add rdvs to conges
        console.log(event);
        event.target.className="btn btn-block btn-dark ";
        event.target.disabled=true;
        let rdvDate=new Date(new Date(date).setHours(0, 0, 0, 0));
        let rdv:Mesrdv={id:0,rdvDate:rdvDate,heure:heure,
          customerId:0,couturierId:this.couturierId,status:3,
          customer:this.customer,couturier:this.couturier};
        this.conges.push(rdv);
      }
    }
  }
  declarerConge(){
    if(this.conges.length>0){
      this.conges.forEach(value => {
        this.rdvService.saveRdv(value).subscribe({
          next: data => {
          }, error: err => { console.log(err); }
        });
      });
      alert("Le congé est bien sauvegardé!");
      // reset tab
      this.mesrdvs=[];
      this.fillTab();
    }else{
      alert("Séléctionnez les périodes du congé");
    }
  }

  resetConge() {
    this.conges=[];
  }
  sendEmail( rdv:Mesrdv){
    //mailCouturier
    let curr :any = this.pipe.transform(rdv.rdvDate, 'MM-dd-yyyy');
    let coutRdv:RdvMail = {
      name: rdv.couturier.name,
      email: rdv.couturier.email,
      daterdv:curr,
      heure:rdv.heure,
      client: rdv.customer.name
    };
    let custRdv:RdvMail = {
      name: rdv.customer.name,
      email: rdv.customer.email,
      daterdv:curr,
      heure:rdv.heure,
      client:"Nom:"+rdv.couturier.name +", email :"+rdv.couturier.email
        +", tel :"+rdv.couturier.homePhone
    };
    this.rdvService.sendMailPriseRdv(coutRdv);
    this.rdvService.sendMailConfirmRdv(custRdv);
    alert("Email de confirmation est envoyé!")
  }
}
