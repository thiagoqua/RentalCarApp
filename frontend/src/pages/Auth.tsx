import { useState } from "react"
import { Authenticate } from "../components/Authenticate"
import { User } from "../models/User"
import { Navigate } from "react-router-dom";

export function Auth():JSX.Element{
  const [authCompleted,setAuthCompleted] = useState(false);
  
  const handleLogIn = (userLogged:User) => {
    setAuthCompleted(true);
    localStorage.setItem("user",JSON.stringify(userLogged));
  }

  return (
    <div>
      {authCompleted
        ? <Navigate to='/'/>
        : <Authenticate title="access" handleFinished={handleLogIn}/>
      }
    </div>
  )
}