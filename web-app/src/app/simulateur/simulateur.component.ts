import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
declare let Email: any;

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.css']
})
export class SimulateurComponent implements OnInit {

  simulerFormGroup!:FormGroup
  dataset :Array<any>= [{"key":"111" ,value:	1000},{"key":"112" ,value:	1020},
    {"key":"113" ,value:	1030},{"key":"114" ,value:	1040},
    {"key":"121" ,value:	2200},{"key":"122" ,value:	2220},
    {"key":"123" ,value:	2230},{"key":"124" ,value:	2240},
    {"key":"211" ,value:	2000},{"key":"212" ,value:	2020},
    {"key":"213" ,value:	2030},{"key":"214" ,value:	2040},
    {"key":"221" ,value:	2200},{"key":"222" ,value:	2220},
    {"key":"223" ,value:	2230},{"key":"224" ,value:	2240},
    {"key":"311" ,value:	3000},{"key":"312" ,value:	3020},
    {"key":"313" ,value:	3030},{"key":"314" ,value:	3040},
    {"key":"321" ,value:	3200},{"key":"322" ,value:	3220},
    {"key":"323" ,value:	3230},{"key":"324" ,value:	3240},]

  amount !:string;

  constructor(private https: HttpClient) { }

  ngOnInit(): void {
    this.simulerFormGroup=new FormGroup({
      tenue: new FormControl(),
      typecouture:new FormControl(),
      categorie:new FormControl(),
      amount:new FormControl()
    });
  }

  handleSimuler() {
      let resp = this.simulerFormGroup.value;
      let key = resp.typecouture+resp.categorie+resp.tenue;
      this.dataset.forEach(ligne =>{
        if( ligne.key==key){
          this.amount="Montant : "+ligne.value+" DH";
          console.log(ligne.value)
        }
      });
  }
  sendEmail(){
    let details:cmdMail = {
      name: 'sara',
      email: 'amal.amal.ziad@gmail.com',
      datecmd:'12/02/2023',
      numCmd:'12:30',
      tenue:'tekshita b randa',
      etat:'CREE',
      etatproche:'VALIDE',
      contact:'<p> Amal Ziad</p>'+'<p>0102030504</p>'+'<p>amal.ziad@gmail.com</p>'
    };
    this.https.post<cmdMail>(environment.bankendhost+
      "/BILLING-SERVICE/mailCmd", details).subscribe(
      res => {
        details= res;
        console.log(this.dataset);
        alert('Email Sent successfully');
      });
    interface Details
    {
      name:string;
      email:string;
      daterdv:string;
      heure:string;
      contact:string;
    }
    interface cmdMail
    {
      name:string;
      email:string;
      datecmd:string;
      numCmd:string;
      contact:string;
      etat:string;
      etatproche: string;
      tenue:string;
    }
  }
}
