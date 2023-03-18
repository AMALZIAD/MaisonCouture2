import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Couturier} from "../model/couturier.model";
import {CouturierService} from "../services/couturier.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-couturier',
  templateUrl: './couturier.component.html',
  styleUrls: ['./couturier.component.css']
})
export class CouturierComponent implements OnInit {
  couturiers:any;
      constructor(private http:HttpClient) {
      }

      ngOnInit(): void {
        this.http.get("http://localhost:8888/COUTURIER-SERVICE/couturiers").subscribe(
          data=>{
            this.couturiers=data;
            console.log(data);
          },error=>{
            console.log(error)
          })
      }
}
