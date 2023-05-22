import { useState } from "react";
import { Car } from "../../models/Car";
import { VehicleInfo } from "./VehicleInfo";
import { Link } from "react-router-dom";
import { SeletData } from "./SelectData";
import { CarList } from "../CarList";
import { Disponibility } from "../../models/Disponibility";
import { storeDispo } from "../../helpers/localStorageAccesses";
import { useCars } from "../../hooks/useCars";

export function RentVehicles(): JSX.Element {
  const [show,setShow] = useState<boolean>(false);
  const [carSelected, setCarSelected] = useState<Car>();
  const {vehicles,setAvailability,setFilters} = useCars();

  const handleCar = (id: number) => {
    const car: Car | undefined = vehicles.find(
      (vehicle:Car) => vehicle.id == id
    );
    setCarSelected(car);
  };

  const handleCars = (from:Date,to:Date) => {
    const lang:string = "sv-SE";
    setAvailability(from.toLocaleDateString(lang),
                    to.toLocaleDateString(lang));
    setShow(true);
  };

  const handleFilter = (category:string) => {
    setFilters({category:category});
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 300);
  }

  const handleRent = () => {
    const dropInDate: any = document.getElementById("dropInDate");
    const dropOffDate: any = document.getElementById("dropOffDate");
    const dispo:Disponibility = new Disponibility(
      carSelected!.id,
      dropInDate.value + " 09:00:00",
      dropOffDate.value + " 09:00:00"
    );
    storeDispo(dispo);
  };

  return (
    <div id="rent">
      <h1 className="head-title">Rent!</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <SeletData
              handleCars={handleCars}
              handleFilter={handleFilter}
              handleReset={() => setShow(false)}
            />
          </div>
          <div className="col-lg-3">
            <div className="rv-select-car">
              <h5>Select Car</h5>
              <div className="car-list">
                <CarList
                  vehicles={show && vehicles}
                  handle={handleCar}
                  carSelectedId={carSelected?.id}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            {carSelected &&
            <>
              <div className="porta-photo">
                <img src={carSelected?.imageURL}/>
              </div>
              <Link to="/reserve">
                <button className="animated-button-1" onClick={handleRent}>rent this car
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                  </div>
                </button>
              </Link>
            </>
            }
          </div>
          <div className="col-lg-2 col-md-12">
            <VehicleInfo vehicle={carSelected} />
          </div>
        </div>
      </div>
    </div>
  );
}
