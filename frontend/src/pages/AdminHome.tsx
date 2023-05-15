import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/ReservationInfo";
import { Car } from "../models/Car";
import { Disponibility } from "../models/Disponibility";
import { User } from "../models/User";
import { useUser } from "../hooks/useUser";
import { DisponibilityService } from "../services/disponibilityService";
import { CarService } from "../services/carService";
import { UserService } from "../services/userService";

enum buttonOptions{
  CANCEL, CONFIRM_PAY
}

export function AdminHome():JSX.Element{
  const {userLogged} = useUser();
  const [dispos,setDispos] = useState<Disponibility[]>([]);
  const [users,setUsers] = useState<User[]>([]);
  const [cars,setCars] = useState<Car[]>([]);
  const [error,setError] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(true);
  const dispoService:DisponibilityService = new DisponibilityService();

  const handleClick = (pressed:buttonOptions,id:number) => {
    setLoading(true);
    if(pressed == buttonOptions.CONFIRM_PAY)
      dispoService.setPaid(userLogged,id);
    else
      dispoService.deleteById(id,userLogged.token);
    setTimeout(() => {
      resetEverything();
      getEverything();
      setLoading(false);
    },500);
  }

  useEffect(() => {
    if(userLogged)
      getEverything();
  },[userLogged])

  useEffect(() => {
    if(userLogged){
      const carService:CarService = new CarService();
      const userService:UserService = new UserService();
      carService.getCarsByIds(dispos!.map((dispo:Disponibility) => dispo.carId))
        .then((cars:Car[]) => setCars(cars));
      userService.getAllById(userLogged as User,dispos!.map((dispo:Disponibility) => dispo.userId!))
        .then((response:Response) => {
          if(response.status == 401)
            setError("You are not an ADMIN user to access this resource");
          else
            response.json().then((users:User[]) => {
              setUsers(users);
              setLoading(false);
            });
        })
    }
  },[dispos[0]]);

  const resetEverything = () => {
    setDispos([]);
    setUsers([]);
    setCars([]);
    setError("");
    setLoading(true);
  }

  const getEverything = () => {
    dispoService.getAll(userLogged.id!,userLogged.token!).then((response:Response) => {
      if(response.status == 401)
        setError("You are not an ADMIN user to access this resource");
      else
        response.json().then((data:Disponibility[]) => setDispos(data));
    })
  }

  const showData = (id:number) => {
    const actual:User = users.find((user:User) => user.id == id)!;
    return (
      <>
        <div className="flexdiv">
          <h4 className="accent">by:</h4><h4 className="normal">
            {actual?.firstname} {actual?.lastname}
          </h4>
        </div>
        <div className="flexdiv">
          <h4 className="accent">identifier:</h4><h4 className="normal">
            {actual?.identifier}
          </h4>
        </div>
      </>
    )
  }
  
  return (
    <>
      <h1>Welcome, {userLogged?.firstname} {userLogged?.lastname}</h1>
      <div className="rents-list">
        {!loading 
        ? 
          dispos.map((dispo:Disponibility,index:number) => (
            <div className="col-lg-4 col-md-6 col-sm-12 rents-item" key={dispo.id}>
              <ReservationInfo reservation={dispo} carReserved={cars[index]} key={dispo.id}/>
              {showData(dispo.userId!)}
              {dispo.paid
                ? 
                  <>
                    <button onClick={() => handleClick(buttonOptions.CANCEL,dispo.id!)}
                            className="animated-button-def">
                      Cancel reservation
                    </button>
                    <h6>pay confirmed</h6>
                  </>
                : <button onClick={() => handleClick(buttonOptions.CONFIRM_PAY,dispo.id!)}
                          className="animated-button-def">
                    Confirm Pay
                  </button>
              }
            </div>
          ))
        : <div className="loader"></div>  
        }
      </div>
      {error && <p>{error}</p>}
    </>
  );
}