import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { Link } from "react-router-dom";

export function MyRents():JSX.Element{
  const [reserves,setReserves] = useState<Disponibility[]>([]);
  const [carsReserved,setCarsReserved] = useState<Car[]>([]);
  const user:User = JSON.parse(localStorage.getItem("user")!);
  const dispoService:DisponibilityService = new DisponibilityService();
  const carService:CarService = new CarService();

  useEffect(() => {
    dispoService.getByUser(user.id!,user.token!)
      .then((res:Disponibility[]) => setReserves(res));
  },[]);

  useEffect(() => {
    const carIds:number[] = new Array();
    reserves.forEach((reservation:Disponibility) =>{
      carIds.push(reservation.carId);
    })
    carService.getCarsByIds(carIds).then((cars:Car[]) => setCarsReserved(cars));
  },[reserves])

  return (
    <div>
      <h1>{user.firstname}, your rents are</h1>
      <Link to='/'>
        <button>go to home page</button>
      </Link>
      {reserves.map((dispo:Disponibility,index:number) => (
        <div>
          <p>car:  {carsReserved[index]?.brand} {carsReserved[index]?.model}</p>
          <p>from:  {dispo.dateIn}</p>
          <p>to:  {dispo.dateOut}</p>
          <img src={carsReserved[index]?.imageURL} alt="car-reserved-photo" className="photo"/>
        </div>
      ))}
    </div>
  )
}