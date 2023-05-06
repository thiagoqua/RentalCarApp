import "./Components.css";
import { useEffect, useState } from "react";
import { APIURL, CATEGORIES } from "../extra/constants";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { RentVehicles } from "./RentVehicles/RentVehicles";
import { CarList } from "./CarList";

export function CarGallery(): JSX.Element {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

  const service: CarService = new CarService();

  const vehiclesBy = (category?: string) => {
    if(category)
      service.getCarsByCategory(category).then((cars: Car[]) => {
        setVehicles(cars);
        setCurrentCarIndex(0);
      });
    else
      service.getAllCars().then((cars:Car[]) => {
        setVehicles(cars);
        setCurrentCarIndex(0);
      })
  };

  const handleCar = (index:number) => {
    setCurrentCarIndex(index);
  };

  useEffect(() => {
    service.getAllCars().then((cars: Car[]) => setVehicles(cars));
  }, []);

  return (
    <div id="gallery" className="gallery">
      <h1 className="head-title">Our cars</h1>
      <Container fluid>
        <div className="row">
          <div className="col-lg-2 col-md-2 vm-list">
            <h3>Categories</h3>
            <div className="item-list">
              <button className="item" onClick={() => {vehiclesBy()}}>all</button>
              {CATEGORIES.map((category) => (
                <button
                  onClick={() => {
                    vehiclesBy(category);
                  }}
                  key={category}
                  className={`item ${
                    vehicles[currentCarIndex]?.category == category
                      ? "item-clicked"
                      : "item-declicked"
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="col-lg-7 col-md-7 vm-car">
            <div>
              <div className="porta-photo">
                <img
                  src={vehicles[currentCarIndex]?.imageURL}
                  alt="car_image"
                  className="vm-car-photo"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 vm-list">
            <h3>Cars</h3>
            <div className="item-list">
              <CarList vehicles={vehicles} 
                       handle={handleCar}
                       carId={vehicles[currentCarIndex]?.id}
                       passingIndex={true}/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
