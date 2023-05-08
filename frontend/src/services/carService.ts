import { APIURL } from "../helpers/constants";
import { Car } from "../models/Car";

export class CarService{
    
    public getAllCars():Promise<Car[]>{
        return fetch(`${APIURL}/car/all`).then(data => data.json());
    }

    public getAllCategories():Promise<string[]>{
        return fetch(`${APIURL}/car/categories`).then(data => data.json());
    }

    public getCarsByCategory(category:string):Promise<Car[]>{
        return fetch(`${APIURL}/car/category?category=${category}`).then(data => data.json());
    }

    public getCarsDisponibility(dateIn:string,dateOff:string):Promise<Car[]>{
        return fetch(`${APIURL}/disponibility/cars?in=${dateIn}&out=${dateOff}`)
        .then(data => data.json());
    }

    public getCarById(id:number):Promise<Car>{
        return fetch(`${APIURL}/car/id?id=${id}`).then(data => data.json());
    }

    public getCarsByIds(ids:number[]):Promise<Car[]>{
        return fetch(`${APIURL}/car/idmulti`,{
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: JSON.stringify(ids)
        }).then(data => data.json());
    }

}