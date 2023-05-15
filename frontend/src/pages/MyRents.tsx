import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { Link } from "react-router-dom";
import { Authenticate } from "../components/Authenticate";
import { ReservationInfo } from "../components/ReservationInfo";
import { savedUser } from "../helpers/localStorageAccesses";

export function MyRents():JSX.Element{
  const [reserves,setReserves] = useState<Disponibility[]>([]);
  const [carsReserved,setCarsReserved] = useState<Car[]>([]);
  const [userLogged,setUserLogged] = useState<User>();
  const [sorted,setSorted] = useState<boolean>(true);
  const [enableAnimation,setEnableAnimation] = useState<boolean>(false);
  const [cancel,setCancel] = useState<number>();
  const dispoService:DisponibilityService = new DisponibilityService();
  const carService:CarService = new CarService();
  const className:string = `${enableAnimation ? 'loader' : cancel ? 'flexdiv-col' : 'rents-list'}`;

  const onLoggedIn = (user:User) => {
    setUserLogged(user);
  }

  const handleSorting = (newerSorting:boolean) => {
    setSorted(newerSorting);
    setReserves(
      newerSorting ? 
        reserves.sort((a:Disponibility,b:Disponibility) => {
          return Date.parse(b.dateIn) - Date.parse(a.dateIn);
        })
      :
        reserves.sort((a:Disponibility,b:Disponibility) => {
          return Date.parse(a.dateIn) - Date.parse(b.dateIn);
        })
    );
  }

  const deleteReservation = () => {
    setEnableAnimation(true);
    dispoService.deleteById(cancel!,userLogged!.token!);
    //i wait 2 second to the next petiton so the previous petition make effect
    setTimeout(() => {
      dispoService.getByUser(userLogged!.id!,userLogged!.token!)
          .then((res:Disponibility[]) => setReserves(res.sort((a:Disponibility,b:Disponibility) => {
            return Date.parse(b.dateIn) - Date.parse(a.dateIn);
          })));
    },2000)
    //show the animation 3 seconds to simulate the petition
    setTimeout(() => setEnableAnimation(false),3000)
    setCancel(undefined);
  }

  useEffect(() => {
    const user:User|null = savedUser();
    if(user){
      setUserLogged(user);
      dispoService.getByUser(user.id!,user.token!)
        .then((res:Disponibility[]) => setReserves(res.sort((a:Disponibility,b:Disponibility) => {
          return Date.parse(b.dateIn) - Date.parse(a.dateIn);
        })));
    }
  },[]);

  useEffect(() => {
    const carIds:number[] = new Array();
    reserves.forEach((reservation:Disponibility) =>{
      carIds.push(reservation.carId);
    })
    carService.getCarsByIds(carIds).then((cars:Car[]) => 
      setCarsReserved(cars)
    );
  },[reserves[0]])

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
                reserves.map((dispo:Disponibility,index:number) => (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-12 rents-item" key={dispo.id}>
                      <ReservationInfo  reservation={dispo} 
                                        carReserved={carsReserved[index]}/>
                      {canCancel(new Date(dispo.dateIn))
                        ? <button onClick={() => setCancel(dispo.id)} className="animated-button-def">
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