import { APIURL } from "../extra/constants";
import { Disponibility } from "../models/Disponibility";

export class DisponibilityService{

  constructor(){
  }
  
  public save(dispo:Disponibility,userToken:string):Promise<any>{
    return fetch(`${APIURL}/disponibility/reserve`,{
      method: 'POST',
      headers: new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
      }),
      body: JSON.stringify(dispo)
    });
  }

  public getByUser(userId:number,userToken:string):Promise<Disponibility[]>{
    return fetch(`${APIURL}/disponibility/all?userid=${userId}`,
    {
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
      })
    }).then((res:Response) => res.json());
  }

  public deleteById(id:number,userToken:string){
    return fetch(`${APIURL}/disponibility/delete?id=${id}`,
    {
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
      })
    });
  }
}