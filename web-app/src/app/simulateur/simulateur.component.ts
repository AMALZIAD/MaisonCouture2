import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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

  constructor() { }

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

    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "amal.amal.ziad@gmail.com",
      Password : "26B8FD9BC6729CDAEFB203EF3452793BBC3B",
      To : 'ziad.amal@outlook.fr',
      From : "amal.amal.ziad@gmail.com",
      Subject : "This is the subject",
      Body : "And this is the body"
    }).then(
        (message: any) => alert(message)
    );
  }
}
