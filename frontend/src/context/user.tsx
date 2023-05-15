import { createContext, useState } from "react";
import { User } from "../models/User";

export const UserContext = createContext<any>({});

export function UserProvider({children}:{children:JSX.Element}):JSX.Element{
  const [userLogged,setUserLogged] = useState<User>();

  return (
    <UserContext.Provider value={{userLogged,setUserLogged}}>
      {children}
    </UserContext.Provider>
  );
}