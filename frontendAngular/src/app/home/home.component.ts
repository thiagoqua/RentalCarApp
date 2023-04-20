import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/Car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public vehicle:Observable<Car>|undefined;
  public vehicles$:Observable<Car[]>;

  constructor(private service:CarService) {
    this.vehicles$ = this.service.getAllCars();
    this.vehicles$.subscribe(cars => {
      this.vehicle = of(cars[0]);
      console.log(cars[0].imageURL)
    })
  }

  ngOnInit(): void {}

}
