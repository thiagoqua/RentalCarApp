import { useState } from "react"
import { Authenticate } from "../components/Authenticate"
import { User } from "../models/User"
import { Navigate } from "react-router-dom";
import { storeUserLogged } from "../helpers/methods";

export function Auth():JSX.Element{
  const [authCompleted,setAuthCompleted] = useState(false);
  
  const handleLogIn = (userLogged:User) => {
    setAuthCompleted(true);
    storeUserLogged(userLogged);
  }

  return (
    <div>
      {authCompleted
        ? <Navigate to='/'/>
        : <Authenticate title="Access" handleFinished={handleLogIn}/>
      }
    </div>
  )
}