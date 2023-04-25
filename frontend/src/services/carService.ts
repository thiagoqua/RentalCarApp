import { APIURL } from "../constants";
import { Car } from "../models/Car";

export class CarService{
    
    public getAllCars():Promise<Car[]>{
        return fetch(`${APIURL}/car/all`).then(data => data.json());
    }

    public getAllCategories():Promise<string[]>{
        return fetch(`${APIURL}/car/categories`).then(data => data.json());
    }

    public getCarsByCategory(category:string):Promise<Car[]>{
        return fetch(`${APIURL}/car/category/${category}`).then(data => data.json());
    }

    public getCarsDisponibility(dateIn:string,dateOff:string):Promise<Car[]>{
        return fetch(`${APIURL}/car/disponibility?in=${dateIn}&out=${dateOff}`)
        .then(data => data.json());
    }

}