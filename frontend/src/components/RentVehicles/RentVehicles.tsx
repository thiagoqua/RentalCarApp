import { useEffect, useState } from "react";
import { Car } from "../../models/Car";
import { CarService } from "../../services/carService";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CATEGORIES } from "../../extra/constants";
import { VehicleInfo } from "./VehicleInfo";
import { Link } from "react-router-dom";
import { SeletData } from "./SelectData";
import { CarList } from "../CarList";
import { Disponibility } from "../../models/Disponibility";
import { storeDispo } from "../../extra/methods";

export function RentVehicles(): JSX.Element {
  const [vehiclesAvailable, setVehiclesAvailable] = useState<Car[]>([]); //vehicles available from the dates selected
  const [vehiclesFiltered, setVehiclesFiltered] = useState<Car[]>([]); //the vehicles available but with filters
  const [datesCompleted, setDatesCompleted] = useState(false);
  const [carSelected, setCarSelected] = useState<Car>();
  const [inDate, setInDate] = useState<string>();
  const [sorted, setSorted] = useState<boolean>(true); //true if is sorted by higher price

  const service: CarService = new CarService();

  const handleDates = (isFirstDate: boolean) => {
    //if the function is called by the first input type date
    const dropInDate: any = document.getElementById("dropInDate");
    if (isFirstDate) {
      setInDate(dropInDate.value);
    } else {
      const dropOffDate: any = document.getElementById("dropOffDate");

      if (dropInDate.value && dropOffDate.value) {
        setDatesCompleted(true);
        service
          .getCarsDisponibility(dropInDate.value, dropOffDate.value)
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
      <h1 className="head-title">The rent vehicles section</h1>
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
              <h5>select car</h5>
              <h6>sort by </h6>
              <span
                onClick={() => handleSorting(false)}
                className={`item ${!sorted ? "item-clicked" : "item-decliked"}`}
              >
                higher price
              </span>
              <span> - </span>
              <span
                onClick={() => handleSorting(true)}
                className={`item ${sorted ? "item-clicked" : "item-decliked"}`}
              >
                lower price
              </span>
              <div className="item-list-smaller">
                <CarList
                  vehicles={vehiclesFiltered}
                  handle={handleCar}
                  carId={carSelected?.id}
                  passingIndex={false}
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
                <button className="rv-rent-button" onClick={handleRent}>rent</button>
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
