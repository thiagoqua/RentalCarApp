import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { Authenticate } from "../components/Authenticate";

export function Reserve():JSX.Element{
  const [isLogged,setIsLogged] = useState<boolean>();
  const dispoInCuestion:Disponibility = JSON.parse(localStorage.getItem("dispo")!) as Disponibility;

  const handleButton = () => {
    localStorage.removeItem("dispo");
  }

  const onLoggedIn = () => {
    setIsLogged(true);
  }

  return (
    <div className="container">
      {!isLogged 
        ? <Authenticate handleFinished={onLoggedIn}/> 
        : 
        <>
          <h1>you are now logged</h1>
        </>
      }
    </div>
  );
}