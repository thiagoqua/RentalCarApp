import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { useUser } from "./useUser";
import { DisponibilityService } from "../services/disponibilityService";
import { User } from "../models/User";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { UserService } from "../services/userService";

interface Prop{
  setError:(error:string) => void;
}

export function useAdmin({setError}:Prop):any{
  const {userLogged} = useUser();
  const [dispos,setDispos] = useState<Disponibility[]>([]);
  const [users,setUsers] = useState<User[]>([]);
  const [cars,setCars] = useState<Car[]>([]);

  const dispoService:DisponibilityService = new DisponibilityService();
  const carService:CarService = new CarService();
  const userService:UserService = new UserService();

  useEffect(() => {
    if(userLogged)
      getDispos();
  },[userLogged])

  useEffect(() => {
    carService.getCarsByIds(dispos!.map((dispo:Disponibility) => dispo.carId))
      .then((cars:Car[]) => setCars(cars));
    userService.getAllById(userLogged as User,dispos!.map((dispo:Disponibility) => dispo.userId!))
      .then((response:Response) => {
        if(response.status == 401)
          setError("You are not an ADMIN user to access this resource");
        else
          response.json().then((users:User[]) => setUsers(users));
      })
  },[dispos[0]]);

  const getDispos = () => {
    dispoService.getAll(userLogged.id!,userLogged.token!).then((response:Response) => {
      if(response.status == 401)
        setError("You are not an ADMIN user to access this resource");
      else
        response.json().then((data:Disponibility[]) => setDispos(data));
    })
  }

  const setPaid = (id:number) => {
    dispoService.setPaid(userLogged,id);
  }

  const deleteReservation = (id:number) => {
    dispoService.deleteById(id,userLogged.token);
  }

  const resetData = () => {
    setDispos([]);
    setUsers([]);
    setCars([]);
    setError("");
    getDispos();
  }


  return {adminLogged:userLogged,dispos,users,cars,setPaid,deleteReservation,resetData}
}