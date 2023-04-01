import { Component, OnInit } from '@angular/core';
import {MesrdvService} from "../services/mesrdv.service";
import {Mesrdv} from "../model/mesrdv";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-mesrdvs',
  templateUrl: './mesrdvs.component.html',
  styleUrls: ['./mesrdvs.component.css']
})
export class MesrdvsComponent implements OnInit {

  mesrdvs!:Observable<Mesrdv[]>;
  errorMessage!:string;
  constructor(private mesrdvsService:MesrdvService) { }

  ngOnInit(): void {
    this.mesrdvs=this.mesrdvsService.getRdvs().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
