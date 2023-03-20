import { Component, OnInit } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {CouturierService} from "../services/couturier.service";
import {Couturier} from "../model/couturier.model";

@Component({
  selector: 'app-couturiers',
  templateUrl: './couturiers.component.html',
  styleUrls: ['./couturiers.component.css']
})
export class CouturiersComponent implements OnInit {

  couturiers!:Observable<Array<Couturier>>;
  errorMessage!:string;
  constructor(private couturierService: CouturierService) { }

  ngOnInit(): void {
    this.couturiers=this.couturierService.getCouturiers().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
