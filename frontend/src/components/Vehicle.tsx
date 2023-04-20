import { Car } from '../models/Car';
import './Components.css'

export function Vehicle({car}:{car:Car}):JSX.Element{
    return (
        <>
            <img src={car.imageURL} alt='car_image'/>
            <h3>Características</h3>
        </>
    );
}