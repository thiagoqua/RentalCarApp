import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { CarService } from "../services/carService";
import { Car } from "../models/Car";

export function DisponibilityInfo({dispo}:{dispo:Disponibility}):JSX.Element{
  const [car,setCar] = useState<Car>();
  const service:CarService = new CarService();
  const avgConsumition:number = (car?.routeConsumption! + car?.urbanConsumption!) / 2;

  useEffect(() => {
    service.getCarById(dispo.carId).then((vehicle:Car) => setCar(vehicle));
  }
  ,[])

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <h5>Car brand: </h5><h5 className="normal">{car?.brand}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Car model: </h5><h5 className="normal">{car?.model}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Year: </h5><h5 className="normal">{car?.year}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Price per day: </h5><h5 className="normal">{car?.pricePerDay}</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <h5>Doors: </h5><h5 className="normal">{car?.doors}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Transmission: </h5><h5 className="normal">{car?.transmission}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Fuel type: </h5><h5 className="normal">{car?.fuelType}</h5>
        </div>
        <div className="col-lg-3 col-sm-6">
          <h5>Average consumition (route - urban): </h5><h5 className="normal">{avgConsumition}</h5>
        </div>
      </div>
      <div className="row">
        <div>
          <img src={car?.imageURL} alt="car_image" className="photo"/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h5>Since: </h5><h5 className="normal">{dispo.dateIn}</h5>
        </div>
        <div className="col-lg-6">
          <h5>Until: </h5><h5 className="normal">{dispo.dateOut}</h5>
        </div>
      </div>
    </>
  )
}