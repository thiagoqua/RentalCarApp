import { Disponibility } from "../models/Disponibility";
import { User } from "../models/User";

// functions who access to the localstorage
export function getUserLogged():User|null{
  const user:string|null = localStorage.getItem("user");
  return user ? JSON.parse(user) as User : null;
}

export function getDispo():Disponibility|null{
  const dispo:string|null = localStorage.getItem("dispo");
  return dispo ? JSON.parse(dispo) as Disponibility : null;
}

export function storeUserLogged(user:User):void{
  localStorage.setItem("user",JSON.stringify(user));
}

export function storeDispo(dispo:Disponibility):void{
  localStorage.setItem("dispo",JSON.stringify(dispo));
}

export function removeObject(obj:string){
  localStorage.removeItem(obj);
}