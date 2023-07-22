import {Mesure} from "./mesure.model";

export interface Customer{
  id :number;
  name: string;
  email: string;
  idkc :string;
  mesure:Mesure;
  photo:string;
  phone:string;
  adresse:string;
}
