import { useContext, useEffect } from "react";
import { User } from "../models/User";
import { UserService } from "../services/userService";
import { savedUser, removeSomething, storeUser } from "../helpers/localStorageAccesses";
import { UserContext } from "../context/user";

export function useUser():any{
  const {userLogged,setUserLogged} = useContext(UserContext);
  const service:UserService = new UserService();

  useEffect(() => {
    const user:User|null = savedUser();
    if(user){
      //check for the validation of the token
      service.checkTokenValidation(user)
        .then((valid:boolean) => {
          if(valid)
            setUserLogged(user)
          else
            removeSomething('user');
        })
    }
  },[])

  const login = (user:User) => {
    setUserLogged(user);
    storeUser(user);
  }

  const logout = () => {
    removeSomething('user');
    setUserLogged(undefined);
  }

  return {userLogged,login,logout};
}