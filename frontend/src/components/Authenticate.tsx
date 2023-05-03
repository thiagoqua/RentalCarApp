import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { User } from "../models/User";
import { comingFrom } from "../extra/constants";

interface Prop{
  handleFinished:(user:User) => void;
  title:string;
}

export function Authenticate({handleFinished,title}:Prop):JSX.Element{
  //true if user wants to login, false if user wants to sign in
  const [wantsToLogin,setWantsToLogin] = useState<boolean>();  
  const [signUpCompleted,setSignUpCompleted] = useState<boolean>(false);  

  const onSignUpCompleted = () => {
    setSignUpCompleted(true);
  }

  const onLogInCompleted = (user:User) => {
    handleFinished(user);
  }

  return (
    <div>
      {!signUpCompleted ?
        <>
          <h1>{title}</h1>
            {wantsToLogin == undefined 
            ? 
            <>
              <button onClick={() => setWantsToLogin(true)}>log in</button>
              <button onClick={() => setWantsToLogin(false)}>sign in</button>
            </>
            : wantsToLogin 
            ? <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.USER}/> 
            : <SignUp handleFinished={onSignUpCompleted}/>}
        </>
        : <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.SIGNUP}/>
      }
    </div>
  );
}