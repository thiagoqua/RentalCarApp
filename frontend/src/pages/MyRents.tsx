import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { Link } from "react-router-dom";
import { Authenticate } from "../components/Authenticate";
import { ReservationInfo } from "../components/ReservationInfo";
import { getUserLogged } from "../extra/methods";

export function MyRents():JSX.Element{
  const [reserves,setReserves] = useState<Disponibility[]>([]);
  const [carsReserved,setCarsReserved] = useState<Car[]>([]);
  const [userLogged,setUserLogged] = useState<User>();
  const [sorted,setSorted] = useState<boolean>(true);
  const [enableAnimation,setEnableAnimation] = useState<boolean>(false);
  const dispoService:DisponibilityService = new DisponibilityService();
  const carService:CarService = new CarService();
  const className:string = enableAnimation ? "loader" : "rents-list";

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

  const deleteReservation = (id:number) => {
    setEnableAnimation(true);
    dispoService.deleteById(id,userLogged!.token!);
    //i wait 2 second to the next petiton so the previous petition make effect
    setTimeout(() => {
      dispoService.getByUser(userLogged!.id!,userLogged!.token!)
          .then((res:Disponibility[]) => setReserves(res.sort((a:Disponibility,b:Disponibility) => {
            return Date.parse(b.dateIn) - Date.parse(a.dateIn);
          })));
    },2000)
    //show the animation 3 seconds to simulate the petition
    setTimeout(() => setEnableAnimation(false),3000)
  }

  useEffect(() => {
    const user:User|null = getUserLogged();
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
            <h6>Sorted by rent date</h6>
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
            reserves.map((dispo:Disponibility,index:number) => (
              <ReservationInfo  reservation={dispo} 
                                carReserved={carsReserved[index]} 
                                onCancel={deleteReservation}
                                key={dispo.id}/>
            ))
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