import { useEffect, useState } from "react";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CATEGORIES } from "../constants";
import { VehicleInfo } from "./VehicleInfo";

export function RentVehicles(): JSX.Element {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [datesSelected, setDatesSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [carSelected, setCarSelected] = useState<Car>();
  const [inDate, setInDate] = useState();

  const service: CarService = new CarService();

  const handleDates = (isFirstDate: boolean) => {
    //if the function is called by the first input type date
    const dropInDate: any = document.getElementById("dropInDate");
    if (isFirstDate) {
      setInDate(dropInDate.value);
    } else {
      const dropOffDate: any = document.getElementById("dropOffDate");

      if (dropInDate.value && dropOffDate.value) {
        setDatesSelected(true);
        service
          .getCarsDisponibility(dropInDate.value, dropOffDate.value)
          .then((cars: Car[]) => setVehicles(cars));
      }
    }
  };

  const handleCarClick = (id: number) => {
    const car: Car | undefined = vehicles.find((vehicle) => vehicle.id == id);
    setCarSelected(car);
  };

  const handleRentClick = () => {
    
  }

  return (
    <>
      <h1 className="head-title">The rent vehicles section</h1>
      <form>
        <Container fluid>
            <Row>
                <Col lg={6}>
                    <Col lg={12} className="rv-section">
                        <div className="rv-section-data">
                            <span>drop in date</span>
                            <input
                                type="date"
                                id="dropInDate"
                                onChange={() => {
                                handleDates(true);
                                }}
                                min={new Date().toJSON().slice(0, 10)}
                            />
                        </div>
                        <div className="rv-section-data">
                            <span>drop off date</span>
                            <input
                                type="date"
                                id="dropOffDate"
                                onChange={() => handleDates(false)}
                                min={inDate}
                            />
                        </div>
                    </Col>
                    <Col className="rv-section">
                        <div className="rv-section-data">
                            <span>select car type</span>
                            <select disabled={!datesSelected}>
                                {CATEGORIES.map((category) => (
                                <option
                                    onClick={() => setCategorySelected(category)}
                                    key={category}
                                >
                                    {category}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="rv-section-data">
                            <span>select car</span>
                            <select disabled={!categorySelected}>
                                {vehicles
                                .filter((car) => car.category === categorySelected)
                                .map((car) => (
                                    <option
                                    key={car.id}
                                    onClick={() => {
                                        handleCarClick(car.id);
                                    }}
                                    >
                                    {car.brand} {car.model}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </Col>
                        <Col>
                            {carSelected ? <VehicleInfo vehicle={carSelected}/> : <></>}
                        </Col>
                </Col>
                <Col lg={6}>
                    {carSelected ?
                        <>
                            <div className="porta-photo">
                                <img src={carSelected?.imageURL}/>
                            </div>
                            <button className="rv-rent-button" onClick={handleRentClick}>rent</button>
                        </>
                        :
                        <></>
                    }
                </Col>
            </Row>
        </Container>
      </form>
    </>
  );
}
