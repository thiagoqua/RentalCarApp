import { useState } from "react";
import { Car } from "../../models/Car";
import { CarService } from "../../services/carService";
import { Container, Row, Col } from "react-bootstrap";
import { VehicleInfo } from "./VehicleInfo";
import { Link } from "react-router-dom";
import { SeletData } from "./SelectData";
import { CarList } from "../CarList";
import { Disponibility } from "../../models/Disponibility";
import { storeDispo } from "../../helpers/methods";

export function RentVehicles(): JSX.Element {
  const [vehiclesAvailable, setVehiclesAvailable] = useState<Car[]>([]); //vehicles available from the dates selected
  const [vehiclesFiltered, setVehiclesFiltered] = useState<Car[]>([]); //the vehicles available but with filters
  const [datesCompleted, setDatesCompleted] = useState(false);
  const [carSelected, setCarSelected] = useState<Car>();
  const [inDate, setInDate] = useState<Date>();
  const [sorted, setSorted] = useState<boolean>(true); //true if is sorted by higher price

  const service: CarService = new CarService();

  const handleDates = (isFirstDate: boolean) => {
    //if the function is called by the first input type date
    const dropInDate: any = document.getElementById("dropInDate");
    if (isFirstDate) {
      setInDate(dropInDate.valueAsDate);
    } else {
      const dropOffDate: any = document.getElementById("dropOffDate");

      if (dropInDate.value && dropOffDate.value) {
        setDatesCompleted(true);
        service.getCarsDisponibility(dropInDate.value, dropOffDate.value)
          .then((cars: Car[]) => {
            setVehiclesAvailable(cars);
            setVehiclesFiltered(cars);
          });
      }
    }
  };

  const handleCar = (id: number) => {
    const car: Car | undefined = vehiclesAvailable.find(
      (vehicle) => vehicle.id == id
    );
    setCarSelected(car);
  };

  const handleCategory = (which: string) => {
    const vehiclesByCat: Car[] = vehiclesAvailable.filter(
      (car: Car) => car.category == which
    );
    setVehiclesFiltered(
      vehiclesByCat.sort((a: Car, b: Car) => a.pricePerDay - b.pricePerDay)
    );
  };

  const handleSorting = (higherSorting: boolean) => {
    higherSorting
      ? setVehiclesFiltered(
          vehiclesFiltered.sort(
            (a: Car, b: Car) => a.pricePerDay - b.pricePerDay
          )
        )
      : setVehiclesFiltered(
          vehiclesFiltered.sort(
            (a: Car, b: Car) => b.pricePerDay - a.pricePerDay
          )
        );
    setSorted(higherSorting);
  };

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
      <Container fluid>
        <Row>
          <Col lg={3}>
            <SeletData
              handleDates={handleDates}
              handleCategory={handleCategory}
              inDate={inDate}
              datesCompleted={datesCompleted}
            />
          </Col>
          <Col lg={2}>
            <div className="rv-select-car">
              <h5>Select Car</h5>
              <h6>sort by </h6>
              <span
                onClick={() => handleSorting(false)}
                className={!sorted ? "sorting sorting-clicked" : "sorting"}
              >
                higher price
              </span>
              <span> - </span>
              <span
                onClick={() => handleSorting(true)}
                className={sorted ? "sorting sorting-clicked" : "sorting"}
              >
                lower price
              </span>
              <div className="car-list">
                <CarList
                  vehicles={vehiclesFiltered}
                  handle={handleCar}
                  carSelectedId={carSelected?.id}
                />
              </div>
            </div>
          </Col>
          <Col lg={5}>
            {carSelected ? 
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
            :
            <>
            </>
            }
          </Col>
          <Col lg={2} md={12}>
            <VehicleInfo vehicle={carSelected} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
