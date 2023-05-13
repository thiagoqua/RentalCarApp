import { useEffect,useState } from "react";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";

export function useCar({id}:{id?:number}):any{
  const [car,setCar] = useState<Car>();
  const service:CarService = new CarService();
  
  useEffect(() => {
    if(id)
      search(id);
  },[])
  
  const search = (id:number) => {
    service.getCarById(id).then((vehicle:Car) => setCar(vehicle));
  }

  return {car,setId:search};
}