import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {HttpClient} from "@angular/common/http";
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
    return this.http.get<Couturier[]>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers")
      .pipe(map((result:any)=>{
        return result._embedded.couturiers; //just return "couturiers"
      }));
  }
  //  get one couturuer by ID
  public getCouturier(id:number):Observable<Couturier>{
    return this.http.get<Couturier>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/"+id)
      /*.pipe(map((result:any)=>{
        return result._embedded.couturiers; //just return "couturiers"
      }));*/
  }
  //  get oCOUTURIER REVIEWS
  public getReviews(id:number):Observable<Review[]>{
    return this.http.get<Review[]>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/"+id+"/reviews")
     .pipe(map((result:any)=>{
       return result._embedded.reviews; //just return "couturiers"
     }));
  }
  //  post a review
  public addReview(id:number):Review{
    return this.http.post<Review>(environment.bankendhost+"/COUTURIER-SERVICE/couturiers/"+id+"/reviews");
    return this.http.post(environment.bankendhost+"/CUSTOMER-SERVICE/mesures",mesure);
  }

  // get list of cutomers by id couturier
  public getCustomersByCouturier(id: number):Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.bankendhost+"/BILLING-SERVICE/CustomersByCouturier/"+id)
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }
}
