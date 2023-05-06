import { Col, Container, Row } from "react-bootstrap";
import { Car } from "../models/Car";

export function VehicleInfoExtended({vehicle}:{vehicle:Car}):JSX.Element{
  const avgConsumption:number = (vehicle.urbanConsumption + vehicle.routeConsumption) / 2;
  return (
    <div className="vi-container">
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Year</h5>
        <span>{vehicle ? vehicle.year : "-"}</span>
      </div>
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Price per day</h5>
        <span>{vehicle ? `USD $ ${vehicle.pricePerDay}` : "-"}</span>
      </div>
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Doors</h5>
        <span>{vehicle ? vehicle.doors : "-"}</span>
      </div>
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Transmission</h5>
        <span>{vehicle ? vehicle.transmission : "-"}</span>
      </div>
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Fuel type</h5>
        <span>{vehicle ? vehicle.fuelType : "-"}</span>
      </div>
      <div className="col-lg-12 col-sm-6">
        <h5 className="h5-property">Consumption average</h5>
        <span className="car-advice">Urban consumption + Route consumption</span>
        <br/>
        <span>{vehicle ? avgConsumption : "-"}</span>
      </div>
    </div>
  )
}