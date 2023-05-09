import { useForm } from "react-hook-form";
import { UserService } from "../services/userService";
import { AuthenticationRequest } from "../models/AuthenticationRequest";
import { User } from "../models/User";
import { useState } from "react";
import { comingFrom } from "../helpers/constants";
import { storeUserLogged } from "../helpers/methods";

interface Props{
  handleFinished:(user:User) => void;
  whoCallsMe:comingFrom;
}

export function LogIn({handleFinished,whoCallsMe}:Props):JSX.Element{
  const {register, formState:{ errors }, handleSubmit} = useForm();
  //user if the data is correct and the user is logged. null if there isnt a user with that email
  const [userLogged,setUserLogged] = useState<boolean>();
  const [error,setError] = useState<string>();
  
  const handleData = (formData:any) => {
    const service:UserService = new UserService();
    const authRequest:AuthenticationRequest = new AuthenticationRequest(formData.email,formData.password);
    service.logIn(authRequest).then((res:Response) => {
      if(!res.ok)
        setUserLogged(false);
      else
        res.json().then((user:User) => {
          handleFinished(user);
          setUserLogged(true);
          if(formData.remember)
            storeUserLogged(user);
        });
    },(reason:string) => setError(reason));
  }
  
  return (
    <>
      {whoCallsMe == comingFrom.SIGNUP && <h1>Registration succesfull!</h1>}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(handleData)}>
        <div className="inputdiv">
          <div>
            <input type="email" placeholder="email"{...register('email',{
              required:true,
              pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            })}/>
            {errors.email?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
            {errors.email?.type === "pattern" && <h4 className="advice">Insert a valid email</h4>}
          </div>
          <div>
            <input type="password" placeholder="password" {...register('password',{
              required:true
            })}/>
            {errors.password?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
          </div>
          <div>
            <label className="checkbox-container keep">
              <input type="checkbox" {...register('remember')}/><h4>keep me logged in</h4>
              <div className="checkmark"></div>
            </label>  
          </div>
        </div>
        {userLogged == false && <h5>invalid credentials</h5>}
        <input type="submit" value="log in" className="animated-button-def"/>
        {error && <h4 className="advice">Se produjo un error al enviar la petición al servidor</h4>}
      </form>
    </>
  )
}