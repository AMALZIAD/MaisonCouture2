import {Couturier} from "../model/couturier.model";
export interface Review{
  id :number;
  name: string;
  rate:number;
  comment: string;
  couturier:any
}
