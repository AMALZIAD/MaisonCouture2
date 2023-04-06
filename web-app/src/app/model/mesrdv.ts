import {Couturier} from "./couturier.model";
import {Customer} from "./customer.model";

export interface Mesrdv{
  id:number,
  rdvDate: any,
  heure: string,
  status: number,
  customerId: number,
  couturierId:number
}
