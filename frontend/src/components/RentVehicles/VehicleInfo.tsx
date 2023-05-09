import { Car } from "../../models/Car";
import "../Components.css";

export function VehicleInfo({vehicle}:{vehicle: Car|undefined;}): JSX.Element {  
  return (
    <div className="vi-container">
      <div className="vi-container-item">
        <span className="attr">Year</span>
        <span>{vehicle ? vehicle.year : "-"}</span>
      </div>
      <div className="vi-container-item">
        <span className="attr">Price p/day</span>
        <span>{vehicle ? `USD $ ${vehicle.pricePerDay}` : "-"}</span>
      </div>
      <div className="vi-container-item">
        <span className="attr">Doors</span>
        <span>{vehicle ? vehicle.doors : "-"}</span>
      </div>
      <div className="vi-container-item">
        <span className="attr">Transmission</span>
        <span>{vehicle ? vehicle.transmission : "-"}</span>
      </div>
      <div className="vi-container-item">
        <span className="attr">Fuel type</span>
        <span>{vehicle ? vehicle.fuelType : "-"}</span>
      </div>
    </div>
  );
}
