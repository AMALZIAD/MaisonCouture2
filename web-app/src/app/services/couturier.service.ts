import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Couturier} from "../model/couturier.model";
import {Review} from "../model/review.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CouturierService {


  constructor(private http:HttpClient) { }

  // LITS OF COUTURIERS
  public getCouturiers():Observable<Couturier[]>{
    return this.http.get<Couturier[]>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/?projection=fCouturier")
  }
  //  get one couturuer by ID
  public getCouturier(id:number):Observable<Couturier>{
    return this.http.get<Couturier>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/"+id);
   }
  //  get one couturuer by IDKC
  public getCouturierIdkc(idkc:string):Observable<Couturier>{
    return this.http.get<Couturier>(environment.bankendhost+"/COUTURIER-SERVICE/CouturierByIdkc/"+idkc)
  }

  // save couturier
//create account in web site
  public saveCouturier(couturier: Couturier):Observable<Couturier>{
    return this.http.post<Couturier>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers",couturier);
  }
  // edit couturier
  public editCouturier(couturier: Couturier):Observable<Couturier>{
    return this.http.post<Couturier>(environment.bankendhost+"/COUTURIER-SERVICE/editCouturier",couturier);
  }
  //  get oCOUTURIER REVIEWS
  public getReviews(id:number):Observable<Review[]>{
    return this.http.get<Review[]>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/"+id+"/reviews")
     .pipe(map((result:any)=>{
       return result._embedded.reviews; //just return "couturiers"
     }));
  }

  public addReview(review: Review):Observable<Review>{
    return this.http.post<Review>(environment.bankendhost+"/COUTURIER-SERVICE/reviews",review);
  }

  // get list of cutomers by id couturier
  public getCustomersByCouturier(id: number):Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/BILLING-SERVICE/CustomersByCouturier/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }

  // define fucntion to uplaod file
  upload(formData:FormData,id:number):Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(environment.bankendhost+'/COUTURIER-SERVICE/upload/'+id,formData,{
      reportProgress:true,
      observe:'events'
    });
  }

}
