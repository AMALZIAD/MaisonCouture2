import {Couturier} from "./couturier.model";
import {Customer} from "./customer.model";

export interface Order{
  id:number,
  typecouture: number,
  categorie: number,
  tenue: number,
  orderdate: Date,
  status: number,
  customer: any,
  couturier:any,
  customerId: number,
    couturierId:number
}
