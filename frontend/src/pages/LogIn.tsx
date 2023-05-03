import { useForm } from "react-hook-form";
import { UserService } from "../services/userService";
import { AuthenticationRequest } from "../models/AuthenticationRequest";
import { User } from "../models/User";
import { useState } from "react";
import { comingFrom } from "../extra/constants";

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
            localStorage.setItem("user",JSON.stringify(user));
        });
    },(reason:string) => setError(reason));
  }
  
  return (
    <>
      {whoCallsMe == comingFrom.SIGNUP && <h1>Registration succesfull!</h1>}
      <h1>you are being login</h1>
      <form onSubmit={handleSubmit(handleData)}>
        <div>
          <label>Email</label>
          <input type="email" {...register('email',{
            required:true,
            pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          })}/>
          {errors.email?.type === "required" && <p>Completing this field is required</p>}
          {errors.email?.type === "pattern" && <p>Insert a valid email</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password',{
            required:true
          })}/>
          {errors.password?.type === "required" && <p>Completing this field is required</p>}
        </div>
        <div>
          <input type="checkbox" {...register('remember')}/><label>keep me logged in</label>
        </div>
        {userLogged == false && <h5>invalid credentials</h5>}
        <input type="submit" value="log in"/>
        {error && <h4 style={{color:'red'}}>Se produjo un error al enviar la petición al servidor</h4>}
      </form>
    </>
  )
}