import { Component, OnInit } from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {ActivatedRoute} from "@angular/router";
import { Couturier } from '../model/couturier.model';
import { Review } from '../model/review.model';
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-couturier-details',
  templateUrl: './couturier-details.component.html',
  styleUrls: ['./couturier-details.component.css']
})
export class CouturierDetailsComponent implements OnInit {
  tokenjson !: any;
  starRating = 0;
  fileName = '';
  couturier!:Couturier;
  review!:any;
  couturierId!:number;
  reviews:Review[]=[];
  errorMessage!:string;
  newReviewFormGroup !:FormGroup;
  editProfilFormGroup!:FormGroup;
  addPictureFormGroup!:FormGroup;


  constructor(private fb:FormBuilder,private couturierService: CouturierService,
              private route:ActivatedRoute,public sec: KeycloakSecurityService,private http:HttpClient) {
    this.couturierId=this.route.snapshot.params["id"];
    console.log("id cou..."+this.couturierId);
    this.tokenjson=sec.kc.tokenParsed;
    //get couturier detail
    this.couturierService.getCouturier(this.couturierId)
      .subscribe({ next : (data)=>{
          this.couturier= data;
        },
        error : ()=>{}
      });
  }

  ngOnInit(): void {
    // if customer is connected --------
    if(this.sec.kc.hasRealmRole('CUSTOMER')){
      // comment form
      this.newReviewFormGroup=this.fb.group({
        comment: this.fb.control(null,[Validators.required, Validators.minLength(50)])});
      console.log("hello ....")
    }
    //get couturier reviews
    console.log("get reviewsz ....")
    console.log("id cou..."+this.couturierId);
    this.couturierService.getReviews(this.couturierId).subscribe({
      next: data => {
        this.reviews=data;
      },
      error: err => {
        console.log(err);
      }
    });
    console.log("reviews  ....",this.reviews)
  }// end oninit----------------------------------------------------------

  //add review function---------------------------------------------------------
  addReview() {
    let review =this.newReviewFormGroup.value;
    review.name= this.sec.kc.tokenParsed?.['name'];
    review.couturier={id:<number>this.couturierId}
    console.log(this.starRating);
    review.rate=this.starRating;
    console.log(review);
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
