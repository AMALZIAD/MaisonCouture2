import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Mesrdv} from "../model/mesrdv";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MesrdvService {

  constructor(private http:HttpClient) { }

  //All rdvs
  public getRdvs():Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/rdvs")
      .pipe(map((result:any)=>{
        return result._embedded.rdvs; //just return "couturiers"
      }));
  }
  //current couturier rdvs----------------------------------------------------------------
  public getCurrentRdvs(id:number,date:any):Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/CurrentRdv/"+date+"/"+id)
     /* .pipe(map((result:any)=>{
        return result._embedded.rdvs; //just return "couturiers"
      }));*/
  }

  // save rdv ----------------------------------------------------------------------------------------
  public saveRdv(rdv:Mesrdv){
    return this.http.post(environment.bankendhost+"/RDV-SERVICE/rdvs",rdv)
  }
}
