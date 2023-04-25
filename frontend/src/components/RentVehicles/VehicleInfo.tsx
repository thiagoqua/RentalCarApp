import { Link } from "react-router-dom";
import { Car } from "../../models/Car";
import "../Components.css";
import { Col } from "react-bootstrap";

export function VehicleInfo({vehicle}:{vehicle: Car|undefined;}): JSX.Element {  
  return (
    <div className="vi-container">
      <Col lg={12}>
        <h5>Year</h5>
        <span>{vehicle ? vehicle.year : "-"}</span>
      </Col>
      <Col lg={12}>
        <h5>Price p/day</h5>
        <span>{vehicle ? `USD $ ${vehicle.pricePerDay}` : "-"}</span>
      </Col>
      <Col lg={12}>
        <h5>Doors</h5>
        <span>{vehicle ? vehicle.doors : "-"}</span>
      </Col>
      <Col lg={12}>
        <h5>Transmission</h5>
        <span>{vehicle ? vehicle.transmission : "-"}</span>
      </Col>
      <Col lg={12}>
        <h5>Fuel type</h5>
        <span>{vehicle ? vehicle.fuelType : "-"}</span>
      </Col>
    </div>
  );
}
