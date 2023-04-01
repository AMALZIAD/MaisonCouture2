import { Component, OnInit } from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {ActivatedRoute} from "@angular/router";
import { Couturier } from '../model/couturier.model';
import { Review } from '../model/review.model';
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-couturier-details',
  templateUrl: './couturier-details.component.html',
  styleUrls: ['./couturier-details.component.css']
})
export class CouturierDetailsComponent implements OnInit {

  couturier!:Couturier;
  review!:any;
  couturierId!:number;
  reviews!:Observable<Review[]>;
  errorMessage!:string;
  newReviewFormGroup !:FormGroup;
  constructor(private fb:FormBuilder,private couturierService: CouturierService,
              private route:ActivatedRoute,private sec: KeycloakSecurityService) {
    this.couturierId=this.route.snapshot.params["id"];
    console.log("id cou..."+this.couturierId);
  }

  ngOnInit(): void {
    // comment form
    this.newReviewFormGroup=this.fb.group({
      comment: this.fb.control(null,[Validators.required, Validators.minLength(50)])});
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
    console.log("id cou..."+this.couturierId);
    this.reviews=this.couturierService.getReviews(this.couturierId).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    console.log("reviews  ....",this.reviews)
  }

  addReview() {
    let review =this.newReviewFormGroup.value;
    review.name= this.sec.kc.tokenParsed?.['name'];
    review.couturier={id:<number>this.couturierId}
   this.review= this.couturierService.addReview(review).subscribe({
     next: data => {
       alert("Review has been successfully updated!");
     },
     error: err => {
       console.log(err);
     }
   });
  }
}
