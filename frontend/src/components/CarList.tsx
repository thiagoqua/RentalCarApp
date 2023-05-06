import { Car } from "../models/Car";

interface myProps {
  vehicles: Car[];
  handle: (idOrIndex: number) => void;
  carId: number|undefined;
  passingIndex:boolean;     //if pass the list's index or the id to the handle function
}

export function CarList({ vehicles, handle, passingIndex ,carId }: myProps): JSX.Element {
  return (
    <>
      {vehicles.map((car,index) => (
        <span
          key={car.id}
          onClick={() => {
            const idOrIndex = passingIndex ? index : car.id;
            handle(idOrIndex);
          }}
          className={`item ${carId == car.id ? 'item-clicked' : 'item-decliked'}`}
        >
          {car.brand.toUpperCase()} {car.model.toUpperCase()}
        </span>
      ))}
    </>
  );
}
