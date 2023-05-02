import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { CarService } from "../services/carService";
import { Car } from "../models/Car";
import { Col, Container, Row } from "react-bootstrap";

export function DisponibilityInfo({dispo}:{dispo:Disponibility}):JSX.Element{
  const [car,setCar] = useState<Car>();
  const service:CarService = new CarService();
  const avgConsumition:number = (car?.routeConsumption! + car?.urbanConsumption!) / 2;

  useEffect(() => {
    service.getCarById(dispo.carId).then((vehicle:Car) => setCar(vehicle));
  }
  ,[])

  return (
    <>
    <Container>
      <Row>
        <Col>
          <label>Car brand: </label><span>{car?.brand}</span>
        </Col>
        <Col>
          <label>Car model: </label><span>{car?.model}</span>
        </Col>
        <Col>
          <label>Year: </label><span>{car?.year}</span>
        </Col>
        <Col>
          <label>Price per day: </label><span>{car?.pricePerDay}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Doors: </label><span>{car?.doors}</span>
        </Col>
        <Col>
          <label>Transmission: </label><span>{car?.transmission}</span>
        </Col>
        <Col>
          <label>Fuel type: </label><span>{car?.fuelType}</span>
        </Col>
        <Col>
          <label>Average consumition (route - urban): </label><span>{avgConsumition}</span>
        </Col>
      </Row>
      <Row>
        <div>
          <img src={car?.imageURL} alt="car_image" className="photo"/>
        </div>
      </Row>
      <Row>
        <Col>
          <label>Since: </label><span>{dispo.dateIn}</span>
        </Col>
        <Col>
          <label>Until: </label><span>{dispo.dateOut}</span>
        </Col>
      </Row>
    </Container>
    </>
  )
}