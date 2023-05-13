import { useState } from "react"
import { Authenticate } from "../components/Authenticate"
import { User } from "../models/User"
import { Navigate } from "react-router-dom";
import { storeUser } from "../helpers/localStorageAccesses";
import { useUser } from "../hooks/useUser";

export function Auth():JSX.Element{
  const {login} = useUser();
  const [authCompleted,setAuthCompleted] = useState(false);
  
  const handleLogIn = (userLogged:User) => {
    setAuthCompleted(true);
    login(userLogged);
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