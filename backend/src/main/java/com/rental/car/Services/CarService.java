package com.rental.car.Services;

import com.rental.car.Models.Car;
import com.rental.car.Models.CarCategory;

import java.util.Date;
import java.util.List;

public interface CarService {
    List<Car> getAllCars();
    List<Car> getByCategory(String category);
    List<Car> getByPriceLessThan(Double maxPrice);
    List<String> getCategories();
    List<Car> getCarsByDisponibility(String dateInStr,String dateOutStr);
}
