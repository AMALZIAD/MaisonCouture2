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


  constructor( private fb:FormBuilder,private couturierService: CouturierService,
               public sec: KeycloakSecurityService,private http:HttpClient) {  }

  onSend() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    this.http.post(
      "https://formsubmit.co/alison.gonser@ndsu.edu",
      { name: "amal@live.fr", replyto: "amal.amal.ziad@gmail.com", subject: "hello sis",
        message: "hello cute miss you !"},
      { headers: headers }
    )
      .subscribe(response => {
        console.log(response);
      });
    /*Email.send({
      Host : "smtp-relay.gmail.com",
    Username : "amal.amal.ziad@gmail.com",
    Password : "@A248553",
    To : "amal.amal.ziad@gmail.com",
    From : this.sec.kc.tokenParsed?.['name'] + "@gmail.com",
      Subject : "this.model.subject",
      Body : "<i>This is sent as a feedback from my resume page.</i> " })
      .then( (message: any) => {alert(message); } );*/
  }

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
    // initialise inputs in the form with control
    this.editProfilFormGroup = this.fb.group({
      name: this.fb.control(couturier.name, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(couturier.email, [Validators.required, Validators.email])
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
    console.log(cout);
    this.couturierService.editCouturier(cout).subscribe({
      next: data => {
        alert("Les données sont bien sauvegardées!");
      },
      error: err => {
        console.log(err);
      }
    });
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





}
