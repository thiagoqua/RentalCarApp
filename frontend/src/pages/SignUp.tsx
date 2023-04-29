import { RegisterOptions, useForm } from "react-hook-form"
import { borndateValidator, passwordsMatchValidator } from "../components/extra/validators";
import { User } from "../models/User";
import { UserService } from "../services/userService";

interface Prop{
  handleFinished:() => void;
}

export function SignUp({handleFinished}:Prop):JSX.Element{
  const { register, formState:{ errors },handleSubmit } = useForm();

  const handleData = (data:Object) => {
    const service:UserService = new UserService();
    var user:User = (data as User);
    service.signUp(user).then((data:any) => {
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
          <input type="number" {...register('identifier',{
            required:true,
            minLength:5,
            maxLength:25})}
          />
          {errors.id?.type === "required" && <p>Completing this field is required</p>}
          {errors.id?.type === "minLength" && <p>This field must have at least 5 characters</p>}
          {errors.id?.type === "maxLength" && <p>This field must have 20 characters as max</p>}
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
          <label>Repeat password</label>
          <input type="password" {...register('repassword',{
            required:true,
            //TODO
            // validate: passwordsMatchValidator(password.value,repassword.value)
          })}/>
          {errors.repassword?.type === "required" && <p>Completing this field is required</p>}
        </div>
        <input type="submit" value="sign in"/>
      </form>
    </>
  )
}