import { Disponibility } from "../models/Disponibility";
import './Components.css'
import { Car } from "../models/Car";

interface Props{
  reservation:Disponibility;
  carReserved?:Car;
}

export function ReservationInfo({reservation,carReserved}:Props):JSX.Element{
  return (
    <>
      <div className="flexdiv">
        <h4 className="accent">car:</h4><h4 className="normal">  {carReserved?.brand} {carReserved?.model}</h4>
      </div>
      <div className="flexdiv">
        <h4 className="accent">from:</h4><h4 className="normal">  {reservation.dateIn.split(' ')[0]}</h4>
      </div>
      <div className="flexdiv">
        <h4 className="accent">to:</h4><h4 className="normal">{reservation.dateOut.split(' ')[0]}</h4>
      </div>
      <img src={carReserved?.imageURL} alt="car-reserved-photo" className="photo"/>
    </>
  );
}