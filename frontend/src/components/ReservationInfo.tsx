import { useState } from "react";
import { Car } from "../models/Car";
import { Disponibility } from "../models/Disponibility";
import './Components.css'

interface Props{
  reservation:Disponibility;
  carReserved?:Car;
  onCancel:(id:number) => void;
}

export function ReservationInfo({reservation,carReserved,onCancel}:Props):JSX.Element{
  const [cancel,setCancel] = useState<boolean>(false);

  const canCancel = (dateIn:Date) => {
    const today:Date = new Date();
    return dateIn > today;
  }

  const handleCancel = (dispoId:number) => {
    setCancel(true);
  }

  const cancelCancel = () => {
    setCancel(false);
  }

  const handleCancelConfirm = () => {
    onCancel(reservation.id!);
    setCancel(false);
  }

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 rents-item" key={reservation.id}>
      {!cancel
        ? 
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
            {canCancel(new Date(reservation.dateIn))
              ? <button onClick={() => handleCancel(reservation.id!)} className="animated-button-def">
                  cancel reservation
                </button>
              : <h4 className="disabled">outdated</h4>
            }
          </>
        :
          <>
            <h3>Are you sure to delete this reservation?</h3>
            <div>
              <button onClick={handleCancelConfirm} className="animated-button-def">yes</button>
              <button onClick={cancelCancel} className="animated-button-def">no</button>
            </div>
          </>
      }
    </div>
  );
}