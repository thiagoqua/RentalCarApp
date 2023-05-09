import { Car } from "../models/Car";

export function VehicleInfoExtended({vehicle}:{vehicle:Car}):JSX.Element{
  const avgConsumption:number = (vehicle.urbanConsumption + vehicle.routeConsumption) / 2;
  
  return (
    <div className="vi-container">
      <div className="vi-container-item">
        <span className="attr">Year</span>
        <span>{vehicle ? vehicle.year : "-"}</span>
      </div>
      <div className="vi-container-item">
        <span className="attr">Price per day</span>
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
      <div className="vi-container-item">
        <span className="attr">Consumption average</span>
        <span className="car-advice">Urban consumption + Route consumption</span>
        <br/>
        <span>{vehicle ? `${avgConsumption} km/lt` : "-"}</span>
      </div>
    </div>
  )
}