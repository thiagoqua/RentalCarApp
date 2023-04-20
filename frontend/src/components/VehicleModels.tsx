import { Vehicle } from "./Vehicle";
import './Components.css'
import { useEffect, useState } from "react";
import { APIURL } from "../constants";
import { Car } from "../models/Car";
import { CarService } from "../services/carService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { RentVehicles } from "./RentVehicles";

export function VehicleModels():JSX.Element{
    const [vehicles,setVehicles] = useState<Car[]>([]);
    const [currentCarIndex,setCurrentCarIndex] = useState<number>(0);
    const [categories,setCategories] = useState<string[]>([]);

    const service:CarService = new CarService();
    
    const nextOrPrevVehicle = (next:boolean) =>{      //true se clickeo next, false se clickeo previous
        if(next){
            const nextCarIndex:number = currentCarIndex + 1;
            if(nextCarIndex < vehicles.length)
                setCurrentCarIndex(nextCarIndex);
            else 
                setCurrentCarIndex(0);
        }
        else {
            const previousCarIndex:number = currentCarIndex - 1;
            if(previousCarIndex >= 0)
                setCurrentCarIndex(previousCarIndex);
            else
                setCurrentCarIndex(vehicles.length - 1);
        }
    }

    const vehiclesByCategory = (category:string) =>{
        service.getCarsByCategory(category).then((cars:Car[]) => {
            setVehicles(cars);
            setCurrentCarIndex(0);
        });
    }

    useEffect(() => {
        service.getAllCars().then((cars:Car[]) => setVehicles(cars));
        service.getAllCategories().then((cats:string[]) => setCategories(cats));
    },[])

    return (
        <>
        <h1 className="head-title">The car section</h1>
        <Container fluid>
            <Row>
                <Col lg="3" md="2" style={{backgroundColor:'red'}}>
                    <h3>Categories</h3>
                    <div className="item-list">
                        {
                            categories.map(category => (
                                <span onClick={() => {vehiclesByCategory(category)}} className="item"
                                      key={category}>
                                    {category}
                                </span>
                            ))
                        }
                    </div>
                </Col>
                <Col lg="6" md="7" className="vm-car"  >
                    <img src={vehicles[currentCarIndex]?.imageURL} alt='car_image' className="vm-car-photo"/>
                    <button onClick={() => nextOrPrevVehicle(false)}>previous vehicle</button>
                    <button onClick={() => nextOrPrevVehicle(true)}>next vehicle</button>
                </Col>
                <Col lg="3" md="3" className="item-list" style={{backgroundColor:'cyan'}}>
                    <h3>Cars</h3>
                    {vehicles.map((car,index) => (
                        <div className="vm-categories-cats">
                            <span key={car.id} onClick={() => {setCurrentCarIndex(index)}} className="item">
                                {car.brand} {car.model}
                            </span>    
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
        </>
    );
}