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
          <h5>Car brand: </h5><h5 className="normal">{car?.brand}</h5>
        </Col>
        <Col>
          <h5>Car model: </h5><h5 className="normal">{car?.model}</h5>
        </Col>
        <Col>
          <h5>Year: </h5><h5 className="normal">{car?.year}</h5>
        </Col>
        <Col>
          <h5>Price per day: </h5><h5 className="normal">{car?.pricePerDay}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Doors: </h5><h5 className="normal">{car?.doors}</h5>
        </Col>
        <Col>
          <h5>Transmission: </h5><h5 className="normal">{car?.transmission}</h5>
        </Col>
        <Col>
          <h5>Fuel type: </h5><h5 className="normal">{car?.fuelType}</h5>
        </Col>
        <Col>
          <h5>Average consumition (route - urban): </h5><h5 className="normal">{avgConsumition}</h5>
        </Col>
      </Row>
      <Row>
        <div>
          <img src={car?.imageURL} alt="car_image" className="photo"/>
        </div>
      </Row>
      <Row>
        <Col>
          <h5>Since: </h5><h5 className="normal">{dispo.dateIn}</h5>
        </Col>
        <Col>
          <h5>Until: </h5><h5 className="normal">{dispo.dateOut}</h5>
        </Col>
      </Row>
    </Container>
    </>
  )
}