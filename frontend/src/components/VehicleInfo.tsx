import { Car } from "../models/Car";
import './Components.css'

export function VehicleInfo({vehicle}:{vehicle:Car}):JSX.Element{
    return (
        <div className="vi-container">
            <div>
                <h5>Year</h5><span>{vehicle.year}</span>
            </div>
            <div>
                <h5>Price p/day</h5><span>USD ${vehicle.pricePerDay}</span>
            </div>
            <div>
                <h5>Doors</h5><span>{vehicle.doors}</span>
            </div>
            <div>
                <h5>Transmission</h5><span>{vehicle.transmission}</span>
            </div>
            <div>
                <h5>Fuel type</h5><span>{vehicle.fuelType}</span>
            </div>
        </div>
    );
}