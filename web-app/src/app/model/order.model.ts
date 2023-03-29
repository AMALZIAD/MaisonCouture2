import {Couturier} from "./couturier.model";
import {Customer} from "./customer.model";

export interface Order{
  id:number,
  typecouture: number,
  categorie: number,
  tenue: number,
  orderdate: string,
  status: number,
  customer: Customer,
  couturier:Couturier
}
