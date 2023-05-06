import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Mesrdv} from "../model/mesrdv";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class MesrdvService {

  constructor(private http:HttpClient) { }

  //All rdvs-------------------------------------------------------------------------------
  public getRdvs():Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/rdvs")
      .pipe(map((result:any)=>{
        return result._embedded.rdvs; //just return "couturiers"
      }));
  }
  //CUSTOMER rdvs------------------------------------------------------------------------------------
  public getCustomerRdvs(id:string):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/RdvsByCustomer/"+id);
  }
  //COUTURIER rdvs------------------OLD---------------------------------------------------------------------
  public getCouturierRdvs(id:string):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/RdvsByCouturier/"+id);
  }
//current couturier rdvs-------les rdvs qui sont deja pris dans la periode de TOMROW +14jours-----------------------------------------------------
  public getTodayRdvs(id:string){
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/TodayRdv/"+id);
  }

  //SCHEDULE current couturier rdvs-------les rdvs qui sont deja pris dans la periode de TOMROW +14jours-----------------------------------------------------
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
}
