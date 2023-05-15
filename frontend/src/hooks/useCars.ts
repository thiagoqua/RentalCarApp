import { useEffect,useState } from "react";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";

export function useCars():any{
  const [vehicles,setVehicles] = useState<Car[]>([]);
  const service:CarService = new CarService();

  const handleIds = (carIds:number[]) => {
    service.getCarsByIds(carIds).then((cars:Car[]) => setVehicles(cars))
  }

  useEffect(() => {
    service.getAllCars().then((cars: Car[]) => {
      setVehicles(cars);
    });
  },[])

  const getByAvailability = (from:string,to:string,category?:string) => {
    service.getCarsDisponibility(from, to)
      .then((cars: Car[]) => {
        let newCars:Car[] = category ? cars.filter((car:Car) => car.category === category) : cars;
        setVehicles(newCars);
      });
  }

  return {vehicles,setAvailability:getByAvailability,setVehiclesIds:handleIds}
}