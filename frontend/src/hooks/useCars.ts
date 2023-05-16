import { useEffect,useRef,useState } from "react";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";

export function useCars():any{
  const allVehicles = useRef<Car[]>();
  const [vehicles,setVehicles] = useState<Car[]>([]);
  const service:CarService = new CarService();

  const handleIds = (carIds:number[]) => {
    service.getCarsByIds(carIds).then((cars:Car[]) => setVehicles(cars))
  }
  
  const getByAvailability = (from:string,to:string) => {
    service.getCarsDisponibility(from, to)
    .then((cars: Car[]) => setVehicles(cars));
  }
  
  const filteredCars = (filter:Record<'category',string>) => {
    const filtered:Car[] = allVehicles.current!.filter((car:Car) => car.category == filter!.category);
    setVehicles(filtered);
  }

  useEffect(() => {
    console.log("created")
    service.getAllCars().then((cars: Car[]) => {
      allVehicles.current = cars;
      setVehicles(cars);
    });
  },[])

  return {vehicles,     //they can be with filters (category,disponibility) or not
          allVehicles,  //they are all the cars in the database
          setAvailability:getByAvailability,
          setVehiclesIds:handleIds,
          setFilters:filteredCars
          }
}