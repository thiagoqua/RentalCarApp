import { useState } from "react";
import { Car } from "../models/Car";
import { Disponibility } from "../models/Disponibility";

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
    <div className="rents-item" key={reservation.id}>
      {!cancel
        ? 
          <>
            <p>car:  {carReserved?.brand} {carReserved?.model}</p>
            <p>from:  {reservation.dateIn.split(' ')[0]}</p>
            <p>to:  {reservation.dateOut.split(' ')[0]}</p>
            <img src={carReserved?.imageURL} alt="car-reserved-photo" className="photo"/>
            {canCancel(new Date(reservation.dateIn))
              ? <button onClick={() => handleCancel(reservation.id!)}>cancel reservation</button>
              : <p>outdated</p>
            }
          </>
        :
          <>
            <h3>Are you sure to delete this reservation?</h3>
            <div>
              <button onClick={handleCancelConfirm}>yes</button>
              <button onClick={cancelCancel}>no</button>
            </div>
          </>
      }
    </div>
  );
}