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
  const [login,setLogin] = useState<boolean>();  
  //true when the user complete the sign up
  const [completed,setCompleted] = useState<boolean>(false);  

  const oncompleted = () => {
    setCompleted(true);
  }

  const onLogInCompleted = (user:User) => {
    handleFinished(user);
  }

  return (
    <div className="auth-container">
      {!completed ?
        <>
          <h1>{!login && title}</h1>
            {login == undefined 
            ? 
            <div>
              <button onClick={() => setLogin(true)}
                      className="animated-button-def">
                Log In
              </button>
              <button onClick={() => setLogin(false)}
                      className="animated-button-def">
                Sign Up
              </button>
            </div>
            : login 
            ? <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.USER}/> 
            : <SignUp handleFinished={oncompleted}/>}
        </>
        : <LogIn handleFinished={onLogInCompleted} whoCallsMe={comingFrom.SIGNUP}/>
      }
    </div>
  );
}