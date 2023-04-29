import { APIURL } from "../components/extra/constants";
import { User } from "../models/User";

export class UserService{

  public signUp(user:User):Promise<any>{          //its any becouse it can return an error
    return fetch(`${APIURL}/user/register`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    }).then(data => data.json());
  }

  public logIn(user:User):Promise<{id:number,token:string}>{
    return fetch(`${APIURL}/user/authenticate`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    }).then(data => data.json())
  }
}