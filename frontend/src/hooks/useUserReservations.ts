import { useEffect, useState } from "react";
import { Car } from "../models/Car";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { CarService } from "../services/carService";
import { User } from "../models/User";

interface Props{
  user?:User;
  sorted:boolean;
}

export function useUserReservations({sorted,user}:Props):any{
  const [reserves,setReserves] = useState<Disponibility[]>([]);
  const [carsReserved,setCarsReserved] = useState<Car[]>([]);
  const dispoService:DisponibilityService = new DisponibilityService();
  const carService:CarService = new CarService();

  useEffect(() => {
    if(user)
      getReservations();
  },[user,sorted]);

  useEffect(() => {
    const carIds:number[] = reserves.map((reservation:Disponibility) => reservation.carId);
    carService.getCarsByIds(carIds).then((cars:Car[]) => setCarsReserved(cars));
  },[reserves[0]])

  const getReservations = () => {
    dispoService.getByUser(user!.id!,user!.token!)
        .then((res:Disponibility[]) => setReserves(toSorted(res)));
  }

  const deleteReserve = (id:number) => {
    dispoService.deleteById(id,user!.token!);
    //i wait 2 second to the next petiton so the previous petition make effect
    setTimeout(() => {
      getReservations();
    },2000)
  }

  const toSorted = (dispos:Disponibility[]) => {
    let sortedReserves:Disponibility[];
    sorted ? 
        sortedReserves = dispos.sort((a:Disponibility,b:Disponibility) => {
          return Date.parse(b.dateIn) - Date.parse(a.dateIn);
        })
      :
        sortedReserves = dispos.sort((a:Disponibility,b:Disponibility) => {
          return Date.parse(a.dateIn) - Date.parse(b.dateIn);
        })
    return sortedReserves;
  }

  return {reserves,carsReserved,deleteReserve};
}