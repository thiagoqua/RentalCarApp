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

    @GetMapping("/category")
    private List<Car> getByCategory(@RequestParam String category){
        return service.getByCategory(category);
    }

    @GetMapping("/price/{maxPrice}")
    private List<Car> getByMaxPrice(@PathVariable Double maxPrice){
        return service.getByPriceLessThan(maxPrice);
    }

    @GetMapping("/categories")
    private List<String> getCategories(){return service.getCategories();}

    @GetMapping("/id")
    private Car getById(@RequestParam Long id){
        return service.getById(id);
    }

    @PostMapping("/idmulti")
    private List<Car> getByIds(@RequestBody List<Long> ids){
        return service.getByIds(ids);
    }

    @GetMapping("/test")
    private ResponseEntity<String> test(){
        return ResponseEntity.ok("it works steve\n");
    }
}
