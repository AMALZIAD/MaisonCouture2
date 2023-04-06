import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  errorMessage!:string;
  mesrdvs !:Observable<Mesrdv[]>;
  days:Array<Date> = [];
  times :Array<any> =[[{h:"09:00",d:"12/02/2013",s:"taken"},
    {h:"09:30",d:"02/02/2018",s:"dispo"},{h:"10:00",d:"02/02/2018",s:"taken"},
    {h:"10:30",d:"02/02/2018",s:"dispo"},{h:"11:00",d:"02/02/2018",s:"taken"},
    {h:"11:30",d:"02/02/2018",s:"dispo"},{h:"14:00",d:"02/02/2018",s:"taken"},"14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                        "15:00","15:30","16:00","16:30","17:00","17:30"]];
                     /* ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"],
                      ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30",
                          "15:00","15:30","16:00","16:30","17:00","17:30"]];*/
  rdvs !:string;
  text:string = "<div [innerHTML]=\"theHtmlString\"></div>"
  constructor(private rdvService:MesrdvService) {}

  ngOnInit(): void {

    // get 2 weeks days table header
    var curr = new Date();
    for (let i=0;i<13;i++){
    // let day=new Date(curr.setDate(curr.getDate() - curr.getDay()+i));
      let day=new Date(curr.setDate(curr.getDate()+1))
      this.days.push(day);
    }
    // get list of rdvs on general
    this.fillRdv();

    // get list of current rdv for couturierId=1
    let pipe = new DatePipe('en-US');
    let current :string | null ="";
     current = pipe.transform(new Date(), 'dd-MM-yyyy');
    console.log("current    "+current)
    this.mesrdvs=this.rdvService.getCurrentRdvs(1,current).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    console.log(this.mesrdvs)
  }


  fillRdv(){
    let str:string="";
    for (let i=0; i<14;i++){
      str=str+"<tr>";
      for (let j=0; j<13;j++){
         str=str+"<td>"+this.times[i]+"</td>"
      }
      str=str+"</tr>";
    }
    this.rdvs=str;

  }

  // validate rdv ----------------------------------------------------
  valideRdv(event:any) {
    // get only buttons clicked
    if(event.target.localName=="button"){
      // get the time end date
      var heure = event.target.innerHTML;
      var date = event.target.name;
      //save it to BD
      let rdvDate = new Date(date);
      let rdv:Mesrdv={id:0,rdvDate:rdvDate,heure:heure,customerId:1,couturierId:1,status:0};
        this.rdvService.saveRdv(rdv).subscribe({
          next: data => {
            alert("Rdv has been successfully saved!");
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
