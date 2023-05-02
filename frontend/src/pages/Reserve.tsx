import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { Authenticate } from "../components/Authenticate";
import { User } from "../models/User";
import { DisponibilityInfo } from "../components/DisponibilityInfo";
import { DisponibilityService } from "../services/disponibilityService";
import { Link, Navigate } from "react-router-dom";

export function Reserve():JSX.Element{
  const [userLogged,setUserLogged] = useState<User>();
  const [confirmed,setConfirmed] = useState<boolean>();
  const service:DisponibilityService = new DisponibilityService();
  const dispoStr:string|null = localStorage.getItem("dispo");
  const dispoInCuestion:Disponibility = JSON.parse(dispoStr!) as Disponibility;

  const handleCancel = () => {
    localStorage.removeItem("dispo");
  }

  const handleConfirm = () => {
    service.save(dispoInCuestion,userLogged!.token!)
      .then((res:Response) => {setConfirmed(res.ok);})
  }

  const onLoggedIn = (user:User) => {
    setUserLogged(user);
  }

  useEffect(() => {
    const checkUserLogged:string|null = localStorage.getItem("user");
    if(checkUserLogged != null){
      const user:User = JSON.parse(checkUserLogged) as User;
      setUserLogged(user)
      dispoInCuestion.userId = user.id;
      //update the item in the localstorage becouse i add the userid
      localStorage.setItem("dispo",JSON.stringify(dispoInCuestion));
    }
  },[])

  return (
    <div className="container">
      {!userLogged 
        ? <Authenticate handleFinished={onLoggedIn}/> 
        : confirmed == undefined ? 
          <>
            <h1>complete your reserve, {userLogged.firstname}</h1>
            <div>
              <h4>Make reserve of:</h4>
              <DisponibilityInfo dispo={dispoInCuestion}/>
            </div>
            <Link to="/">
              <button onClick={handleCancel}>cancel</button>
            </Link>
            <button onClick={handleConfirm}>confirm</button>
          </>
          : confirmed ?
            <>
              <h1>Reserved succesfully!</h1>
              <h5>we will redirect you to the home page</h5>
              <Link to='/'>
                <button>go to home page</button>
              </Link>
            </>
            :
            <>
              <h1>We cannot make your reserve</h1>
              <h5>Please try again later</h5>
              <Link to='/'>
                <button>go to home page</button>
              </Link>
            </>
      }
    </div>
  );
}