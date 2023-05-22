package com.rental.car.Controllers;

import com.rental.car.Models.Car;
import com.rental.car.Services.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
@CrossOrigin(origins = "*")
@Tag(name = "Car")
public class CarController {
    @Autowired
    private CarService service;

    @Operation(summary = "Get all the cars from the database")
    @ApiResponse(responseCode = "200",description = "all the cars")
    @GetMapping("/all")
    private List<Car> getAll(){
        return service.getAllCars();
    }

    @Operation(summary = "Get the cars by their category")
    @ApiResponse(responseCode = "200",description = "All the cars from their category")
    @GetMapping("/category")
    private List<Car> getByCategory(@RequestParam String category){
        return service.getByCategory(category);
    }

    @Operation(summary = "Get the cars under a maximun price per day")
    @ApiResponse(responseCode = "200",description = "All the cars under the price per day")
    @GetMapping("/price/{maxPrice}")
    private List<Car> getByMaxPrice(@PathVariable Double maxPrice){
        return service.getByPriceLessThan(maxPrice);
    }

    @Operation(summary = "Get the car's categories")
    @ApiResponse(responseCode = "200",description = "All the categories")
    @GetMapping("/categories")
    private List<String> getCategories(){return service.getCategories();}

    @Operation(summary = "Get the car by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the car"),
            @ApiResponse(responseCode = "409", description = "Car not found",content = {@Content})
    })
    @GetMapping("/id")
    private ResponseEntity<Car> getById(@RequestParam Long id){
        return service.getById(id);
    }

    @Operation(summary = "Get the cars by their ids")
    @Parameter(name = "ids",description = "The car's id",in = ParameterIn.DEFAULT)
    @PutMapping("/idmulti")
    private List<Car> getByIds(@RequestBody List<Long> ids){
        return service.getByIds(ids);
    }
}
