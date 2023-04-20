import { useEffect, useState } from "react";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import { Container, Row, Col } from "react-bootstrap";

export function RentVehicles():JSX.Element{
    const [categories,setCategories] = useState<string[]>([]);
    const [vehicles,setVehicles] = useState<Car[]>([]);
    const [datesSelected,setDatesSelected] = useState(false);
    
    const service:CarService = new CarService();

    const handleCategoryClick = (category:string) => {
        service.getCarsByCategory(category).then((cars:Car[]) => setVehicles(cars));
    }

    const handleDates = (something:any) => {
        const dropInDate:any = document.getElementById("dropInDate");
        const dropOffDate:any = document.getElementById("dropOffDate");

        if(dropInDate.value && dropOffDate.value){
            setDatesSelected(true);
            service.getCarsDisponibility(dropInDate.value,dropOffDate.value)
                   .then((cars:Car[]) => setVehicles(cars));
        }
    }

    useEffect(() => {
        service.getAllCategories().then((cats:string[]) => setCategories(cats));
    },[])

    return (
        <>
            <h1 className="head-title">The rent vehicles section</h1>
            <form>
                <Container>
                    <Row>
                        <Col>
                            <span>drop in date</span>
                            <input type="date" id="dropInDate" min={new Date().toJSON().slice(0, 10)}/>
                        </Col>
                        <Col>
                            <span>drop off date</span>
                            <input type="date" id="dropOffDate" onChange={handleDates} min={new Date().toJSON().slice(0, 10)}/>
                        </Col>
                        <Col>        
                            <span>select car type</span>
                            <select>
                                {
                                    categories.map(category => (
                                        <option onClick={() => handleCategoryClick(category)}>
                                            {category}
                                        </option>
                                    ))
                                }
                            </select>
                        </Col>
                        <Col>
                            <span>select car</span>
                            <select disabled={!datesSelected}>
                                {
                                    vehicles.map(car => (
                                        <option key={car.id}>{car.brand} {car.model}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                </Container>
            </form>
        </>
    )
}