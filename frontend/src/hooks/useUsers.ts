import { useEffect,useState } from "react";
import { User } from "../models/User";
import { useUser } from "./useUser";
import { UserService } from "../services/userService";

interface Props{
  ids?:number[];
}

export function useUsers({ids}:Props){
  const [error,setError] = useState<string>();
  const [loading,setLoading] = useState<boolean>(true);
  const [users,setUsers] = useState<User[]>([]);
  const {userLogged} = useUser();
  const service:UserService = new UserService();

  const handleIds = (userIds:number[]) => {
    service.getAllById(userLogged,userIds).then((res:Response) => {
      if(res.status == 401)
        setError("You are not an ADMIN user to access this resource");
      else
        res.json().then((data:User[]) => {
          setUsers(data)
          setLoading(false);
        })
    })
  }

  useEffect(() => {
    if(userLogged && ids)
      handleIds(ids);
  },[userLogged])

  return {users,loadingUsers:loading,setUsersIds:handleIds};
}