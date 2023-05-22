package com.rental.car.Services.Impl;

import com.rental.car.Models.Car;
import com.rental.car.Models.CarCategory;
import com.rental.car.Repositories.CarRepository;
import com.rental.car.Repositories.DisponibilityRepository;
import com.rental.car.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepo;
    @Autowired
    private DisponibilityRepository dispoRepo;

    @Override
    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    @Override
    public List<Car> getByCategory(String category) {
        try{
            return carRepo.findByCategory(CarCategory.valueOf(category));
        } catch(IllegalArgumentException iae){
            return Collections.emptyList();
        }
    }

    @Override
    public List<Car> getByPriceLessThan(Double maxPrice) {
        return carRepo.findByPriceLessThan(maxPrice);
    }

    @Override
    public List<String> getCategories() {
        return carRepo.findAllCategories();
    }

    @Override
    public List<Car> getCarsByDisponibility(String dateInStr, String dateOutStr) {
        //09 am is the default in and out hour to rent a car
        final String IN_OUT_HOUR = "09:00:00";
        Timestamp dateIn;
        Timestamp dateOut;
        List<Long> notAvailableCarsIds;
        List<Car> availableCars;

        dateIn = Timestamp.valueOf(dateInStr + " " + IN_OUT_HOUR);
        dateOut  = Timestamp.valueOf(dateOutStr + " " + IN_OUT_HOUR);
        notAvailableCarsIds = dispoRepo.findNotAvailableCars(dateIn,dateOut);

        availableCars = carRepo.findAll();

        return availableCars.stream().filter(car -> {
            boolean isAvailable = true;
            for(Long id : notAvailableCarsIds)
                isAvailable = !car.getId().equals(id);
            return isAvailable;
        }).toList();
    }

    @Override
    public List<Car> getByIds(List<Long> ids) {
        return carRepo.findAllById(ids);
    }

    @Override
    public ResponseEntity<Car> getById(Long id) {
        Optional<Car> ret = carRepo.findById(id);
        return ret.isPresent()
                ? ResponseEntity.ok(ret.get())
                : ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }
}
