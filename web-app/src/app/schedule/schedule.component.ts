import {Component,OnInit,} from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {KeycloakSecurityService} from "../services/keycloak-security.service";


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

  couturierId!:number;
  customerId!:number;
  booked=0;
  constructor(private rdvService:MesrdvService,private route:ActivatedRoute ,
              private customerService :CustomerService,private  sec:KeycloakSecurityService) {
   //get couturier id from route(clickedlink )
    this.couturierId=route.snapshot.params['id'];
    console.log(this.couturierId);
  }

  ngOnInit(): void {

    //get customer ID using backend and idkc
    let idkc: string | undefined  = "";
    idkc=this.sec.kc.tokenParsed?.sub ;
    // get customer data from backend
    if (idkc != null) {
      this.customerService.getCustomerByIdkc(idkc).subscribe({
        next: data => {
          console.log("customer ",data);
          this.customerId=data.id;
        },
        error: err => {
          console.log(err);
        }
      });
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
   // get couturier curennt taken rdvs id couturier  a voir !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   this.rdvService.getCurrentRdvs(this.couturierId).subscribe(value => {
       this.currents.push(value);
     },error => {},
     ()=>{
       this.times.forEach(time=>{
         let jour:Array<any>=[];
         this.days.forEach(day=>{
           let curr :string | null ="";
           curr = this.pipe.transform(day, 'MM-dd-yyyy');
           //console.log("test  "+this.rdvcheck(time,curr));
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
       // console.log("my new status ",c.status);
        if (c.heure==h){
          if(curr==d){
            status=c.status;
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
      //save it to BD
      let rdvDate=new Date(new Date(date).setHours(0, 0, 0, 0));
      let rdv:Mesrdv={id:0,rdvDate:rdvDate,heure:heure,customerId:this.customerId,couturierId:this.couturierId,status:1};
      this.rdvService.saveRdv(rdv).subscribe({
        next: data => {
          alert("Rdv has been successfully saved!");
          // reset tab
          this.mesrdvs=[];
          this.fillTab();
        },
        error: err => {
          console.log(err);
        }
      });
      // msg affichage
      console.log("votre rdv est : "+ date +" à "+heure);

    }
  }
}
