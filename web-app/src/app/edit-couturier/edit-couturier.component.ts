import {Component, OnInit} from '@angular/core';
import {CouturierService} from "../services/couturier.service";
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {FormBuilder, FormGroup,  Validators} from "@angular/forms"
import {Couturier} from "../model/couturier.model";
import {catchError, Observable, throwError} from "rxjs";
import {Review} from "../model/review.model";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-couturier',
  templateUrl: './edit-couturier.component.html',
  styleUrls: ['./edit-couturier.component.css']
})
export class EditCouturierComponent implements OnInit {

  editProfilFormGroup!:FormGroup;
  addPictureFormGroup!:FormGroup;
  couturier!:Couturier;
  reviews:Review[]=[];
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
      profile: this.fb.control(couturier.profile, [Validators.required, Validators.minLength(2)]),
      adresse: this.fb.control(couturier.adresse, [Validators.required, Validators.email]),
      homePhone: this.fb.control(couturier.homePhone)
    });
    // initialise inputs in the form with control
    this.addPictureFormGroup = this.fb.group({
      photo: this.fb.control(null)
    });
  }
  getReviews(){
    //get couturier reviews
    console.log("get reviews ....")
    this.couturierService.getReviews(this.couturier.id).subscribe({
      next: data => {
        this.reviews=data;
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
    cout.email=this.couturier.email
    cout.name=this.couturier.name
    cout.gallery=this.couturier.gallery
    cout.photo="assets/profile/profilCout"+this.couturier.id+".png";
    console.log(cout);
    this.couturierService.editCouturier(cout).subscribe({
      next: data => {
        alert("Les données sont bien sauvegardées!");
      },
      error: err => {
        console.log(err);
      }
    });
    this.couturierService.upload(this.formDataPic,1).subscribe(
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
     console.log(files)
      // @ts-ignore
      for(let file of files){
        let fname=uuidv4()+".png";
        formData.append("files", file,fname);
        this.couturier.gallery.push("assets/imgs/"+fname);
      }
      // upoload to the server
      this.couturierService.upload(formData,0).subscribe(
        event =>{

        },
        (error)=>{
          console.log(error)
        }
      );
      // add pic link to the bd
         this.couturierService.saveCouturier(this.couturier).subscribe(
       data =>{ console.log(data);},
       (error)=>{console.log(error)}
     );
      alert("Les images sont bien Enregistrées!");
    }

  }

// u^pdate photo profil
  onUploadPhoto(event: Event) {
    const target = event!.target as HTMLInputElement;
    let files :FileList | null;
    if(target.files){
      files=target.files;

      // @ts-ignore
      for(const file of files){
        this.formDataPic.append("files", file,"profilCout"+this.couturier.id+".png");
      }

    }
  }
}
