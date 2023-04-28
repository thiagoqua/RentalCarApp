package com.rental.car.Controllers;

import com.rental.car.Models.Car;
import com.rental.car.Models.Disponibility;
import com.rental.car.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/car")
@CrossOrigin(origins = "*")
public class CarController {
    @Autowired
    private CarService service;

    @GetMapping("/all")
    private List<Car> getAll(){
        return service.getAllCars();
    }

    @GetMapping("/category/{cat}")
    private List<Car> getByCategory(@PathVariable String cat){
        return service.getByCategory(cat);
    }

    @GetMapping("/price/{maxPrice}")
    private List<Car> getByMaxPrice(@PathVariable Double maxPrice){
        return service.getByPriceLessThan(maxPrice);
    }

    @GetMapping("/categories")
    private List<String> getCategories(){return service.getCategories();}

    @GetMapping("/test")
    private ResponseEntity<String> test(){
        return ResponseEntity.ok("it works steve");
    }
}
