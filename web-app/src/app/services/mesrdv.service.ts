import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Mesrdv} from "../model/mesrdv";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MesrdvService {

  constructor(private http:HttpClient) { }

  public getRdvs():Observable<Mesrdv[]>{
    return this.http.get<Mesrdv[]>("http://localhost:8888/RDV-SERVICE/rdvs")
      .pipe(map((result:any)=>{
        return result._embedded.rdvs; //just return "couturiers"
      }));
  }
}
