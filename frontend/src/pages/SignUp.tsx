import { RegisterOptions, useForm } from "react-hook-form"
import { borndateValidator, passwordsMatchValidator } from "../helpers/validators";
import { RegisterRequest } from "../models/RegisterRequest";
import { UserService } from "../services/userService";
import { useState } from "react";
import { Container } from "react-bootstrap";

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
      <h1>Sign Up</h1>
      <Container>
        <form onSubmit={handleSubmit(handleData)}>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 signup-input">
              <input type="text" placeholder="First Name" className="input" {...register('firstname',{
                required:true,
                maxLength:20
              })}/>
              {errors.firstname?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.firstname?.type === "maxLength" && <h4 className="advice">Este campo debe tener como máximo 20 caracteres</h4>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 signup-input">
              <input type="text" placeholder="Last Name" {...register('lastname',{
                required:true,
                maxLength:20
              })}/>
              {errors.lastname?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.lastname?.type === "maxLength" && <h4 className="advice">Este campo debe tener como máximo 20 caracteres</h4>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 signup-input">
              <input type="text" placeholder="Nationality" {...register('nationality',{
                required:true,
                maxLength:20
              })}/>
              {errors.nationality?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.nationality?.type === "maxLength" && <h4 className="advice">Este campo debe tener como máximo 20 caracteres</h4>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 signup-input">
              <input type="text" placeholder="ID (DNI for argentineans)" {...register('identifier',{
                required:true,
                minLength:5,
                maxLength:25,
                pattern: /^[0-9]+$/
              })}
              />
              {errors.identifier?.type === "pattern" && <h4 className="advice">Please insert a number</h4>}
              {errors.identifier?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.identifier?.type === "minLength" && <h4 className="advice">This field must have at least 5 characters</h4>}
              {errors.identifier?.type === "maxLength" && <h4 className="advice">This field must have 20 characters as max</h4>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 not">
              <label>Born date</label>
              <input type="date" {...register('borndate',{
                required:true,
                validate:borndateValidator
              })}/>
              {errors.borndate?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.borndate && <h4 className="advice">You have to be 18 or more to sign up</h4>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 signup-input">
              <input type="text" placeholder="Email" {...register('email',{
                required:true,
                pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              })}/>
              {emailInUse && <h4 className="advice">ESTE EMAIL YA PERTENECE A UNA CUENTA REGISTRADA</h4>}
              {errors.email?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.email?.type === "pattern" && <h4 className="advice">Insert a valid email</h4>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12 signup-input">
              <input type="password" placeholder="Password" {...register('password',{
                required:true
              })}/>
              {errors.password?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.repassword && <h4 className="advice">The passwords don't match</h4>}
            </div>
            <div className="col-lg-6 col-sm-12 signup-input">
              <input type="password" placeholder="Repeat Password" {...register('repassword',{
                required:true,
                validate: (val:string) => {return passwordsMatchValidator(val,watch('password'))}
              })}/>
              {errors.repassword?.type === "required" && <h4 className="advice">Completing this field is required</h4>}
              {errors.repassword && <h4 className="advice">The passwords don't match</h4>}
            </div>
          </div>
          <input type="submit" value="Sign Up" className="animated-button-def"/>
        </form>
      </Container>
    </>
  )
}