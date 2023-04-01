import { Component, OnInit } from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {ActivatedRoute} from "@angular/router";
import { Couturier } from '../model/couturier.model';
import { Review } from '../model/review.model';
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-couturier-details',
  templateUrl: './couturier-details.component.html',
  styleUrls: ['./couturier-details.component.css']
})
export class CouturierDetailsComponent implements OnInit {

  couturier!:Couturier;
  couturierId!:number;
  reviews!:Observable<Review[]>;
  errorMessage!:string;

  constructor(private couturierService: CouturierService,private route:ActivatedRoute) {
    this.couturierId=this.route.snapshot.params["id"];
    console.log("id constructor ....",this.couturierId)
  }

  ngOnInit(): void {
    console.log("hello ....")
    //get couturier detail
    this.couturierService.getCouturier(this.couturierId)
      .subscribe({ next : (data)=>{
        this.couturier= data;
        console.log("get couturie ....",data)
      },
      error : ()=>{}
    });
    //get couturier reviews
    console.log("get reviewsz ....")
    this.reviews=this.couturierService.getReviews(this.couturierId).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    console.log("reviews  ....",this.reviews)
  }

  addReview() {

  }
}
