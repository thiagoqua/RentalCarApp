import { useEffect, useState } from "react";
import { ReservationInfo } from "../components/ReservationInfo";
import { Car } from "../models/Car";
import { Disponibility } from "../models/Disponibility";
import { User } from "../models/User";
import { useAdmin } from "../hooks/useAdmin";

enum buttonOptions{
  CANCEL, CONFIRM_PAY
}

export function AdminHome():JSX.Element{
  const {adminLogged,dispos,users,cars,
        setPaid,deleteReservation,resetData} = useAdmin({setError:(msg:string) => setError(msg)});
  const [error,setError] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  },[users]);

  const handleClick = (pressed:buttonOptions,id:number) => {
    setLoading(true);
    if(pressed == buttonOptions.CONFIRM_PAY)
      setPaid(id)
    else
      deleteReservation(id);
    
    //wait 1 second to the second petition to make effect of the first in the db
    setTimeout(() => {
      resetData();
    },1000);
    //wait other second to display correctly the info in the ui
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const showData = (id:number) => {
    const actual:User = users.find((user:User) => user.id == id)!;
    return (
      <>
        <div className="flexdiv">
          <h4 className="accent">by:</h4><h4 className="normal">
            {actual?.firstname} {actual?.lastname}
          </h4>
        </div>
        <div className="flexdiv">
          <h4 className="accent">identifier:</h4><h4 className="normal">
            {actual?.identifier}
          </h4>
        </div>
      </>
    )
  }
  
  return (
    <>
      <h1>Welcome, {adminLogged?.firstname} {adminLogged?.lastname}</h1>
      <div className="rents-list">
        {!loading 
        ? 
          dispos.map((dispo:Disponibility,index:number) => (
            <div className="col-lg-4 col-md-6 col-sm-12 rents-item" key={dispo.id}>
              <ReservationInfo  reservation={dispo} 
                                carReserved={cars.find((car:Car) => car.id == dispo.carId)} 
                                key={dispo.id}/>
              {showData(dispo.userId!)}
              {dispo.paid
                ? 
                  <>
                    <button onClick={() => handleClick(buttonOptions.CANCEL,dispo.id!)}
                            className="animated-button-def">
                      Cancel reservation
                    </button>
                    <h6>pay confirmed</h6>
                  </>
                : <button onClick={() => handleClick(buttonOptions.CONFIRM_PAY,dispo.id!)}
                          className="animated-button-def">
                    Confirm Pay
                  </button>
              }
            </div>
          ))
        : <div className="loader"></div>  
        }
      </div>
      {error && <p>{error}</p>}
    </>
  );
}