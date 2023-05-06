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

  fileName = '';
  couturier!:Couturier;
  review!:any;
  couturierId!:number;
  reviews!:Observable<Review[]>;
  errorMessage!:string;
  newReviewFormGroup !:FormGroup;
  editProfilFormGroup!:FormGroup;
  addPictureFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private couturierService: CouturierService,
              private route:ActivatedRoute,public sec: KeycloakSecurityService,private http:HttpClient) {
    this.couturierId=this.route.snapshot.params["id"];
    console.log("id cou..."+this.couturierId);
    //get couturier detail
    this.couturierService.getCouturier(this.couturierId)
      .subscribe({ next : (data)=>{
          this.couturier= data;
          this.initializeForm(this.couturier);
        },
        error : ()=>{}
      });
  }
  // initialze form with backend data
  initializeForm(couturier:Couturier) {
    // initialise inputs in the form with control
    this.editProfilFormGroup = this.fb.group({
      name: this.fb.control(couturier.name, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(couturier.email, [Validators.required, Validators.email])
    });
    // initialise inputs in the form with control
    this.addPictureFormGroup = this.fb.group({
      photo: this.fb.control(null)
    });
  }

  ngOnInit(): void {
    // if customer is connected
    if(this.sec.kc.hasRealmRole('CUSTOMER')){
      // comment form
      this.newReviewFormGroup=this.fb.group({
        comment: this.fb.control(null,[Validators.required, Validators.minLength(50)])});
      console.log("hello ....")
    }
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
  }// end oninit----------------------------------------------------------

  //add review function---------------------------------------------------------
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
//edit profil function------------------------------------------------------------

  editProfil() {
    let cout: Couturier = this.editProfilFormGroup.value;
    cout.id=this.couturier.id;
    //cust.mesure=this.customer.mesure
    cout.idkc=this.couturier.idkc
    this.couturierService.editCouturier(cout).subscribe({
      next: data => {
        alert("Les données sont bien sauvegardées!");
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addPictures() {

  }

  onFileSelected(event: Event) {
   // console.log(event.target);
    const target = event.target as HTMLInputElement;
    console.log(target.files)
    // @ts-ignore
    let file :File = target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData);

      upload$.subscribe();
    }
  }
}
