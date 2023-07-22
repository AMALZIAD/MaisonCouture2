import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RdvMail} from "../model/rdvmail.model";
import {MesrdvService} from "../services/mesrdv.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sendMailFormGroup!:FormGroup;
  constructor(private fb:FormBuilder, private rdvService :MesrdvService) { }

  ngOnInit(): void {
    this.sendMailFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      subject: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      message: this.fb.control(null, [Validators.required, Validators.minLength(2)])
    });
  }

  sendMail() {
    console.log("im from send email")
    let obj=this.sendMailFormGroup.value;
    console.log(" message :"+obj);
    let custRdv:RdvMail = {
      name: obj.name,
      email: obj.email,
      daterdv:obj.subject,
      heure:"",
      client:obj.message
    };

console.log(" text :"+obj);
    this.rdvService.sendMailContact(custRdv);
    alert("Email est envoyé!")
  }
}
