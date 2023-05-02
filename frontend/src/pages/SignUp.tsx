import { RegisterOptions, useForm } from "react-hook-form"
import { borndateValidator, passwordsMatchValidator } from "../extra/validators";
import { RegisterRequest } from "../models/RegisterRequest";
import { UserService } from "../services/userService";
import { useState } from "react";

interface Prop{
  handleFinished:() => void;
}

export function SignUp({handleFinished}:Prop):JSX.Element{
  const {register, formState:{ errors }, handleSubmit, watch} = useForm();
  const [emailInUse,setEmailInUse] = useState<boolean>(false);

  const handleData = (data:Object) => {
    const service:UserService = new UserService();
    const user:RegisterRequest = data as RegisterRequest;
    service.signUp(user).then((response:{id:number,token:string}) => {
      if(response.id == null)
        setEmailInUse(true);
      else 
        handleFinished();
    });
  }
  
  return (
    <>
      <h1>you are being signin</h1>
      <form onSubmit={handleSubmit(handleData)}>
        <div>
          <label>First name</label>
          <input type="text" {...register('firstname',{
            required:true,
            maxLength:20
          })}/>
          {errors.firstname?.type === "required" && <p>Completing this field is required</p>}
          {errors.firstname?.type === "maxLength" && <p>Este campo debe tener como máximo 20 caracteres</p>}
        </div>
        <div>
          <label>Last name</label>
          <input type="text" {...register('lastname',{
            required:true,
            maxLength:20
          })}/>
          {errors.lastname?.type === "required" && <p>Completing this field is required</p>}
          {errors.lastname?.type === "maxLength" && <p>Este campo debe tener como máximo 20 caracteres</p>}
        </div>
        <div>
          <label>Nationality</label>
          <input type="text" {...register('nationality',{
            required:true,
            maxLength:20
          })}/>
          {errors.nationality?.type === "required" && <p>Completing this field is required</p>}
          {errors.nationality?.type === "maxLength" && <p>Este campo debe tener como máximo 20 caracteres</p>}
        </div>
        <div>
          <label>ID (DNI for argentineans)</label>
          <input type="text" {...register('identifier',{
            required:true,
            minLength:5,
            maxLength:25,
            pattern: /^[0-9]+$/
          })}
          />
          {errors.identifier?.type === "pattern" && <p>Please insert a number</p>}
          {errors.identifier?.type === "required" && <p>Completing this field is required</p>}
          {errors.identifier?.type === "minLength" && <p>This field must have at least 5 characters</p>}
          {errors.identifier?.type === "maxLength" && <p>This field must have 20 characters as max</p>}
        </div>
        <div>
          <label>Born date</label>
          <input type="date" {...register('borndate',{
            required:true,
            validate:borndateValidator
          })}/>
          {errors.borndate?.type === "required" && <p>Completing this field is required</p>}
          {errors.borndate && <p>You have to be 18 or more to sign up</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="text" {...register('email',{
            required:true,
            pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          })}/>
          {emailInUse && <p style={{color:'red'}}>ESTE EMAIL YA PERTENECE A UNA CUENTA REGISTRADA</p>}
          {errors.email?.type === "required" && <p>Completing this field is required</p>}
          {errors.email?.type === "pattern" && <p>Insert a valid email</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password',{
            required:true
          })}/>
          {errors.password?.type === "required" && <p>Completing this field is required</p>}
          {errors.repassword && <p>The passwords don't match</p>}
        </div>
        <div>
          <label>Repeat password</label>
          <input type="password" {...register('repassword',{
            required:true,
            validate: (val:string) => {return passwordsMatchValidator(val,watch('password'))}
          })}/>
          {errors.repassword?.type === "required" && <p>Completing this field is required</p>}
          {errors.repassword && <p>The passwords don't match</p>}
        </div>
        <input type="submit" value="sign in"/>
      </form>
    </>
  )
}