import { APIURL } from "../helpers/constants";
import { Disponibility } from "../models/Disponibility";
import { User } from "../models/User";

export class DisponibilityService{
  
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

  public deleteById(id:number,userToken:string):Promise<Response>{
    return fetch(`${APIURL}/disponibility/delete?id=${id}`,
    {
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
      })
    });
  }

  public getAll(userId:number,userToken:string):Promise<Response>{
    return fetch(`${APIURL}/disponibility/admin/all?adminId=${userId}`,
    {
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
      })
    });
  }

  public setPaid(user:User,id:number):Promise<Response>{
    return fetch(`${APIURL}/disponibility/admin/paid?adminId=${user.id!}&dispoId=${id}`,
    {
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${user.token}`
      })
    });
  }
}