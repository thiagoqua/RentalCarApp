import { useState } from "react";
import { User } from "../models/User";
import { Disponibility } from "../models/Disponibility";
import { Link } from "react-router-dom";
import { Authenticate } from "../components/Authenticate";
import { ReservationInfo } from "../components/ReservationInfo";
import { useUser } from "../hooks/useUser";
import { useUserReservations } from "../hooks/useUserReservations";
import { Car } from "../models/Car";

export function MyRents():JSX.Element{
  const [sorted,setSorted] = useState<boolean>(true);
  const {userLogged,login} = useUser();
  const {reserves,carsReserved,deleteReserve} = useUserReservations({sorted,user:userLogged});
  const [enableAnimation,setEnableAnimation] = useState<boolean>(false);
  const [cancel,setCancel] = useState<number>();
  const className:string = `${enableAnimation ? 'loader' : cancel ? 'flexdiv-col' : 'rents-list'}`;

  const onLoggedIn = (user:User) => {
    login(user);
  }

  const handleSorting = (newerSorting:boolean) => {
    setSorted(newerSorting);
  }

  const deleteReservation = () => {
    setEnableAnimation(true);
    deleteReserve(cancel!);
    //show the animation 3 seconds to simulate the petition
    setTimeout(() => setEnableAnimation(false),3000)
    setCancel(undefined);
  }

  const cancelCancel = () => {
    setCancel(undefined);
  }

  const canCancel = (dateIn:Date) => {
    const today:Date = new Date();
    return dateIn > today;
  }

  return (
    <div>
      {userLogged ? 
      <>
        <div className="flexdiv">
          <h1>{userLogged?.firstname}</h1><h1 className="normal">, your rents are</h1>
        </div>
        <Link to='/'>
          <button className="animated-button-def">go to home page</button>
        </Link>
        <section>
          <div>
            <h5>Sorted by rent date</h5>
            <span className={sorted ? 'sorting-clicked' : 'sorting'}
                  onClick={() => handleSorting(true)}
            >
              lasts
            </span>
            -
            <span className={!sorted ? 'sorting-clicked' : 'sorting'}
                  onClick={() => handleSorting(false)}
            >
              firsts
            </span>
          </div>
        </section>
        <div className={className}>
          {!enableAnimation && 
            <>
              {!cancel 
              ?
                reserves.map((dispo:Disponibility) => (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-12 rents-item" key={dispo.id}>
                      <ReservationInfo  reservation={dispo}
                                        carReserved={carsReserved.find(
                                                      (car:Car) => car.id == dispo.carId)
                                                    }/>
                      {canCancel(new Date(dispo.dateIn))
                        ? dispo.paid
                          ? <h4 className="paid">paid!</h4>
                          : <button onClick={() => setCancel(dispo.id)} className="animated-button-def">
                              cancel reservation
                            </button>
                        : <h4 className="disabled">outdated</h4>
                      }
                    </div>
                  </>
                ))
              :
                <>
                  <h3>Are you sure to delete this reservation?</h3>
                  <div>
                    <button onClick={deleteReservation} className="animated-button-def">yes</button>
                    <button onClick={cancelCancel} className="animated-button-def">no</button>
                  </div>
                </>
            }
            </>
          }
        </div>
      </>
      : 
      <Authenticate title="you have to login to access this resource" 
                    handleFinished={onLoggedIn}/>
      }
    </div>
  )
}