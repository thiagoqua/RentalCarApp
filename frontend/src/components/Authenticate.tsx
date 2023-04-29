import { useState } from "react";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";

interface Prop{
  handleFinished:() => void;
}

export function Authenticate({handleFinished}:Prop):JSX.Element{
  //true if user wants to login, false if user wants to sign in
  const [wantsToLogin,setWantsToLogin] = useState<boolean>();  
  const [signUpCompleted,setSignUpCompleted] = useState<boolean>(false);  

  const onSignUpCompleted = () => {
    setSignUpCompleted(true);
  }

  const onLogInCompleted = () => {
    handleFinished();
  }

  return (
    <div>
      {!signUpCompleted ?
        <>
          <h1>to continue u have to login or register</h1>
            {wantsToLogin == undefined 
            ? 
            <>
              <button onClick={() => setWantsToLogin(true)}>log in</button>
              <button onClick={() => setWantsToLogin(false)}>sign in</button>
            </>
            : wantsToLogin 
            ? <LogIn handleFinished={onLogInCompleted}/> 
            : <SignUp handleFinished={onSignUpCompleted}/>}
        </>
        : <LogIn handleFinished={onLogInCompleted}/>
      }
    </div>
  );
}