import { APIURL } from "../helpers/constants";
import { AuthenticationRequest } from "../models/AuthenticationRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { User } from "../models/User";

export class UserService{

  public signUp(user:RegisterRequest):Promise<Response>{          //its any becouse it can return an error
    return fetch(`${APIURL}/user/register`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
    });
  }

  public logIn(authRequest:AuthenticationRequest):Promise<Response>{
    return fetch(`${APIURL}/user/authenticate`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(authRequest)
    });
  }

  public checkTokenValidation(user:User):Promise<boolean>{
    return fetch(`${APIURL}/user/validate?userid=${user.id}&token=${user.token}`)
            .then(res => res.json());
  }
}