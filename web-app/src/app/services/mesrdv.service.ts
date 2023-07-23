import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Mesrdv} from "../model/mesrdv.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RdvMail} from "../model/rdvmail.model";
import {CmdMail} from "../model/cmdmail.model";
import {Couturier} from "../model/couturier.model";

@Injectable({
  providedIn: 'root'
})
export class MesrdvService {

  //getCurrentRdvs SECDLE
  constructor(private http:HttpClient) { }

  //All rdvs-------------------------------------------------------------------------------
  public getRdvs():Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/rdvs")
      .pipe(map((result:any)=>{
        return result._embedded.rdvs; //just return "couturiers"
      }));
  }

  //CUSTOMER rdvs------------------------------------------------------------------------------------
 /* public getCustomerOldRdvs(id:string):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/OldRdvsByCustomer/"+id);
  }*/
  //pagination
  public getCustomerOldRdvs(idkc:string,request:any):Observable<any>{
    const params = request;
    console.log("request",params)
    return this.http.get(environment.bankendhost+"/RDV-SERVICE/OldRdvsByCustomer/"+idkc, {params})
  }
  /*public getCustomerNewRdvs(id:string):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/NewRdvsByCustomer/"+id);
  }*/
  //pagination
  public getCustomerNewRdvs(idkc:string,request:any):Observable<any>{
    const params = request;
    console.log("request",params)
    return this.http.get(environment.bankendhost+"/RDV-SERVICE/NewRdvsByCustomer/"+idkc, {params})
  }


  //COUTURIER rdvs------------------OLD---------------------------------------------------------------------
  /*public getCouturierRdvs(id:string):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/RdvsByCouturier/"+id);
  }*/
  // pagination
  //  get one couturuer by IDKC
  public getOldRdvCouturier(idkc:string,request:any):Observable<any>{
    const params = request;
    console.log("request",params)
    return this.http.get(environment.bankendhost+"/RDV-SERVICE/OldRdvCouturier/"+idkc, {params})
  }
//current couturier rdvs-------les rdvs qui sont deja pris dans la periode de TOMROW +14jours-----------------------------------------------------
  /*public getTodayRdvs(id:string){
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/TodayRdv/"+id);
  }*/
  // pagination
  public getNewRdvCouturier(idkc:string,request:any):Observable<any>{
    const params = request;
    console.log("request",params)
    return this.http.get(environment.bankendhost+"/RDV-SERVICE/NewRdvCouturier/"+idkc, {params})
  }


//SCHEDULE current couturier rdvs-------SCHEDULE-----------------------------------------------------
  public getCurrentRdvs(id:number){
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/CurrentRdv/"+id);
  }

  // save rdv ----------------------------------------------------------------------------------------
  public saveRdv(rdv:Mesrdv){
    return this.http.post(environment.bankendhost+"/RDV-SERVICE/rdvs",rdv)
  }

  // DELETE RDV ---------------------------------------------------------------------------------------
  public  deleteRdv(id: number){
    console.log("id ",id)
     return this.http.delete(environment.bankendhost+"/RDV-SERVICE/rdvs/"+id);

  }

  //send email prise rdv vers couturier
  public sendMailPriseRdv(details:RdvMail){
    this.http.post<RdvMail>(environment.bankendhost+
      "/RDV-SERVICE/mailCouturier", details).subscribe(
      res => {
        details= res;
        console.log(details);
        console.log('email couturier done!');
      });
  }
//send email prise rdv vers customer
  public sendMailConfirmRdv(details:RdvMail ) {
    this.http.post<RdvMail>(environment.bankendhost+
      "/RDV-SERVICE/mailCustomer", details).subscribe(
      res => {
        details= res;
        console.log(details);
        console.log('email customer done!');
      });
  }

  sendMailContact(custRdv: RdvMail ) {
      this.http.post<RdvMail>(environment.bankendhost+
        "/RDV-SERVICE/mailContact", custRdv).subscribe(
        res => {
          custRdv= res;
          console.log(custRdv);
          console.log('email admin done!');
        });
  }



}
