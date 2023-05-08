import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { User } from "../models/User";
import { comingFrom } from "../helpers/constants";
import './Components.css'

interface Prop{
  handleFinished:(user:User) => void;
  title?:string;
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
    <div className="auth-container">
      {!signUpCompleted ?
        <>
          <h1>{!wantsToLogin && title}</h1>
            {wantsToLogin == undefined 
            ? 
            <div>
              <button onClick={() => setWantsToLogin(true)}
                      className="animated-button-def">
                Log In
              </button>
              <button onClick={() => setWantsToLogin(false)}
                      className="animated-button-def">
                Sign Up
              </button>
            </div>
            : wantsToLogin 
            ? <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.USER}/> 
            : <SignUp handleFinished={onSignUpCompleted}/>}
        </>
        : <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.SIGNUP}/>
      }
    </div>
  );
}