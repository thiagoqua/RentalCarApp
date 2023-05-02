import { APIURL } from "../extra/constants";
import { AuthenticationRequest } from "../models/AuthenticationRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { User } from "../models/User";

export class UserService{

  public signUp(user:RegisterRequest):Promise<{id:number,token:string}>{          //its any becouse it can return an error
    return fetch(`${APIURL}/user/register`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    }).then(data => data.json());
  }

  public logIn(authRequest:AuthenticationRequest):Promise<Response>{
    return fetch(`${APIURL}/user/authenticate`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(authRequest)
    });
  }
}