import {Component, OnInit} from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {FormBuilder, FormGroup,  Validators} from "@angular/forms"
import {Couturier} from "../model/couturier.model";
import {catchError, Observable, throwError} from "rxjs";
import {Review} from "../model/review.model";

import {HttpClient, HttpHeaders} from "@angular/common/http";
@Component({
  selector: 'app-edit-couturier',
  templateUrl: './edit-couturier.component.html',
  styleUrls: ['./edit-couturier.component.css']
})
export class EditCouturierComponent implements OnInit {

  editProfilFormGroup!:FormGroup;
  addPictureFormGroup!:FormGroup;
  couturier!:Couturier;
  reviews!:Observable<Review[]>;
  errorMessage!:string;
  filenames:string[]=[];
  formDataPic=new FormData();


  constructor( private fb:FormBuilder,private couturierService: CouturierService,
               public sec: KeycloakSecurityService) {  }


  ngOnInit(): void {
    //get couturier detail
    let idkc: string | undefined  = "";
    idkc=this.sec.kc.tokenParsed?.sub ;
    console.log(idkc);
    if (idkc != null) {
      this.couturierService.getCouturierIdkc(idkc)
        .subscribe({ next : (data)=>{
            this.couturier= data;
            console.log("hello ...." +data)
            this.initializeForm(this.couturier);
            this.getReviews();
          },
          error : ()=>{}
        });
    }
  }

  // initialze form with backend data
  initializeForm(couturier:Couturier) {
    console.log(couturier);
    // initialise inputs in the form with control
    this.editProfilFormGroup = this.fb.group({
      name: this.fb.control(couturier.name, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(couturier.email, [Validators.required, Validators.email]),
      photo: this.fb.control(null)
    });
    // initialise inputs in the form with control
    this.addPictureFormGroup = this.fb.group({
      photo: this.fb.control(null)
    });
  }
  getReviews(){
    //get couturier reviews
    console.log("get reviews ....")
    this.reviews=this.couturierService.getReviews(this.couturier.id).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

//edit profil function------------------------------------------------------------

  editProfil() {
    let cout: Couturier = this.editProfilFormGroup.value;
    cout.id=this.couturier.id;
    //cust.mesure=this.customer.mesure
    cout.idkc=this.couturier.idkc
    cout.photo="web-app/src/res/profilPic"+this.couturier.id+".png";
    console.log(cout);
    this.couturierService.editCouturier(cout).subscribe({
      next: data => {
        alert("Les données sont bien sauvegardées!");
      },
      error: err => {
        console.log(err);
      }
    });
    this.couturierService.upload(this.formDataPic).subscribe(
      event =>{
        console.log("Photo Profil sauvegardé !");
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  // upload files to the servers //
  onUploadFiles(event:Event):void{
    const target = event.target as HTMLInputElement;
    const formData =new FormData();
    let files :FileList | null;
    if(target.files){
      files=target.files;
      // @ts-ignore
      for(const file of files){formData.append("files", file,file.name);}
      this.couturierService.upload(formData).subscribe(
        event =>{
          alert("Les images sont bien Enregistrées!");
        },
        (error)=>{
          console.log(error)
        }
      );
      // add pic link to the bd
      // @ts-ignore
      for(const file of files){ this.couturier.gallery.push(file.name);}
     this.couturierService.saveCouturier(this.couturier).subscribe(
       data =>{ console.log(data);},
       (error)=>{console.log(error)}
     );
    }

  }


  onUploadPhoto($event: Event) {
    const target = event!.target as HTMLInputElement;
    let files :FileList | null;
    if(target.files){
      files=target.files;
      // @ts-ignore
      for(const file of files){
        this.formDataPic.append("files", file,"profilPic"+this.couturier.id+".png");
      }

    }
  }
}
