import "./Components.css";
import { useEffect, useState } from "react";
import { APIURL, CATEGORIES } from "../constants";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { RentVehicles } from "./RentVehicles/RentVehicles";
import { CarList } from "./CarList";

export function CarGallery(): JSX.Element {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

  const service: CarService = new CarService();

  const nextOrPrevVehicle = (next: boolean) => {
    //true se clickeo next, false se clickeo previous
    if (next) {
      const nextCarIndex: number = currentCarIndex + 1;
      if (nextCarIndex < vehicles.length) setCurrentCarIndex(nextCarIndex);
      else setCurrentCarIndex(0);
    } else {
      const previousCarIndex: number = currentCarIndex - 1;
      if (previousCarIndex >= 0) setCurrentCarIndex(previousCarIndex);
      else setCurrentCarIndex(vehicles.length - 1);
    }
  };

  const vehiclesByCategory = (category: string) => {
    service.getCarsByCategory(category).then((cars: Car[]) => {
      setVehicles(cars);
      setCurrentCarIndex(0);
    });
  };

  const handleCar = (index:number) => {
    setCurrentCarIndex(index);
  };

  useEffect(() => {
    service.getAllCars().then((cars: Car[]) => setVehicles(cars));
  }, []);

  return (
    <div id="gallery">
      <h1 className="head-title">Car gallery</h1>
      <Container fluid>
        <Row>
          <Col lg="2" md="2">
            <h3>Categories</h3>
            <div className="item-list">
              {CATEGORIES.map((category) => (
                <span
                  onClick={() => {
                    vehiclesByCategory(category);
                  }}
                  key={category}
                  className={`item ${
                    vehicles[currentCarIndex]?.category == category
                      ? "item-clicked"
                      : "item-declicked"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </Col>
          <Col lg="7" md="7" className="vm-car">
            <div>
              <div className="porta-photo">
                <img
                  src={vehicles[currentCarIndex]?.imageURL}
                  alt="car_image"
                  className="vm-car-photo"
                />
              </div>
              <button onClick={() => nextOrPrevVehicle(false)}>
                previous vehicle
              </button>
              <button onClick={() => nextOrPrevVehicle(true)}>
                next vehicle
              </button>
            </div>
          </Col>
          <Col lg="3" md="3">
            <h3>Cars</h3>
            <div className="item-list">
              <CarList vehicles={vehicles} 
                       handle={handleCar}
                       carId={vehicles[currentCarIndex]?.id}
                       passingIndex={true}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
