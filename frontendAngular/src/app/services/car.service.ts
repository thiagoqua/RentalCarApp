import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/Car';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { APIURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private backend:HttpClient) {}

  public getAllCars():Observable<Car[]>{
    return this.backend.get<Car[]>(`${APIURL}/all`);
  }
}
