import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { LogIn } from "../components/LogIn";
import { SignIn } from "../components/SignIn";
import { useLocation } from "react-router-dom";

export function Into():JSX.Element{
  const [isLoggingIn,setIsLogginIn] = useState<boolean>();    //true if wants to login, false if wants to sign in
  const dispoInCuestion:Disponibility = JSON.parse(localStorage.getItem("dispo")!) as Disponibility;

  const handleButton = () => {
    localStorage.removeItem("dispo");
  }

  return (
    <div className="container">
      <h1>to continue u have to login or register</h1>
      {isLoggingIn == undefined ? 
      <>
        <button onClick={() => setIsLogginIn(true)}>log in</button>
        <button onClick={() => setIsLogginIn(false)}>sign in</button>
      </>
      : isLoggingIn ? <LogIn/> : <SignIn/>}
    </div>
  );
}