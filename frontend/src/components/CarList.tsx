import { Car } from "../models/Car";

interface myProps {
  vehicles?: Car[];
  handle: (idOrIndex: number) => void;
  carSelectedId: number|undefined;
}

export function CarList({ vehicles, handle, carSelectedId }: myProps): JSX.Element {
  return (
    <>
      {vehicles && 
        vehicles.map((car,index) => (
        <div
          className={carSelectedId == car.id ? 'item item-clicked' : 'item'}
          key={car.id}
          onClick={() => handle(car.id)}
        >
          <img src={car.imageURL} alt={`${car.brand}_${car.model}`} className="micro-item"/>
          <span className="micro-item-desc">{`${car.brand} ${car.model}`}</span>
        </div>
      ))}
    </>
  );
}
