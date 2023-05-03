import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { Authenticate } from "../components/Authenticate";
import { User } from "../models/User";
import { DisponibilityInfo } from "../components/DisponibilityInfo";
import { DisponibilityService } from "../services/disponibilityService";
import { Link, Navigate } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

export function Reserve():JSX.Element{
  const [userLogged,setUserLogged] = useState<User>();
  const [dispoInCuestion,setDispoInCuestion] = useState<Disponibility>();
  const [confirmed,setConfirmed] = useState<boolean>();
  const service:DisponibilityService = new DisponibilityService();

  const handleConfirm = () => {
    service.save(dispoInCuestion!,userLogged!.token!)
      .then((res:Response) => {setConfirmed(res.ok);})
  }

  const onLoggedIn = (user:User) => {
    const dispo:Disponibility = (JSON.parse(localStorage.getItem("dispo")!) as Disponibility);
    dispo.userId = user.id;
    setUserLogged(user);
    setDispoInCuestion(dispo)
    localStorage.removeItem("dispo");
  }

  useEffect(() => {
    const checkUserLogged:string|null = localStorage.getItem("user");
    const dispoStr:string|null = localStorage.getItem("dispo");
    if(dispoStr != null){   //if null becouse trying to access via url
      const dispo:Disponibility = JSON.parse(dispoStr) as Disponibility;
      setDispoInCuestion(dispo);
      if(checkUserLogged != null){
        const user:User = JSON.parse(checkUserLogged) as User;
        dispo.userId = user.id;
        setUserLogged(user);
        localStorage.removeItem("dispo");
      }
    }
  },[])

  return (
    <div className="container">
      {!dispoInCuestion
        ? <NotFoundPage/>
        : !userLogged 
          ? <Authenticate title="to continue, you have to log in or register" 
                          handleFinished={onLoggedIn}/> 
          : confirmed == undefined 
            ? 
              <>
                <h1>complete your reserve, {userLogged.firstname}</h1>
                <div>
                  <h4>Make reserve of:</h4>
                  <DisponibilityInfo dispo={dispoInCuestion!}/>
                </div>
                <Link to="/">
                  <button>cancel</button>
                </Link>
                <button onClick={handleConfirm}>confirm</button>
              </>
            : confirmed 
              ?
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