package com.rental.car.Controllers;

import com.rental.car.Models.Car;
import com.rental.car.Models.Disponibility;
import com.rental.car.Services.CarService;
import com.rental.car.Services.DisponibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/disponibility")
@CrossOrigin(origins = "*")
public class DisponibilityController {
    @Autowired
    private CarService carService;
    @Autowired
    private DisponibilityService dispoService;

    @GetMapping("/cars")
    private List<Car> getCarsByDisponibility(@RequestParam Map<String,String> params){
        return carService.getCarsByDisponibility(params.get("in"),params.get("out"));
    }

    @PostMapping("/reserve")
    private void reserveCar(@RequestBody Disponibility toReserve){
        dispoService.reserve(toReserve);
    }

    @GetMapping("/all")
    private List<Disponibility> getAlByUser(@RequestParam Long userid){
        return dispoService.getAllByUser(userid);
    }

    @GetMapping("/delete")
    private ResponseEntity<Void> delete(@RequestParam Long id){
        dispoService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/all")
    private ResponseEntity<List<Disponibility>> getAll(@RequestParam Long adminId){
        return dispoService.getAll(adminId);
    }

    @GetMapping("/admin/paid")
    private ResponseEntity<Void> setPaid(@RequestParam Long adminId,Long dispoId){
        return dispoService.setPaid(adminId,dispoId);
    }
}
