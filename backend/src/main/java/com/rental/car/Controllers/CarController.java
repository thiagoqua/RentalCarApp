package com.rental.car.Controllers;

import com.rental.car.Models.Car;
import com.rental.car.Models.Disponibility;
import com.rental.car.Services.CarService;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
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

    @GetMapping("/disponibility")
    private List<Car> getCarsByDisponibility(@RequestParam Map<String,String> params){return service.getCarsByDisponibility(params.get("in"),params.get("out"));}

    @PostMapping("/reserve")
    private void reserveCar(@RequestBody Disponibility toReserve){
        service.reserveCar(toReserve);
    }

    @GetMapping("/test")
    private String test(){
        return "it works pepote";
    }
}
