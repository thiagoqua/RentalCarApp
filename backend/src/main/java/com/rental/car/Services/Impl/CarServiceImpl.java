package com.rental.car.Services.Impl;

import com.rental.car.Models.Car;
import com.rental.car.Models.CarCategory;
import com.rental.car.Models.Disponibility;
import com.rental.car.Repositories.CarRepository;
import com.rental.car.Repositories.DisponibilityRepository;
import com.rental.car.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepo;
    @Autowired
    private DisponibilityRepository dispoRepo;
    private final String IN_OUT_HOUR = "12:00:00";          //12 pm is the default in and out hour to rent a car

    @Override
    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    @Override
    public List<Car> getByCategory(String category) {
        try{
            return carRepo.findByCategory(CarCategory.valueOf(category));
        } catch(IllegalArgumentException iae){
            return List.of();
        }
    }

    @Override
    public List<Car> getByPriceLessThan(Double maxPrice) {
        return carRepo.findByPriceLessThan(maxPrice);
    }

    @Override
    public List<String> getCategories() {
        List<CarCategory> categories = List.of(CarCategory.values());
        return categories.stream().map(category -> category.toString())
                .toList();
    }

    @Override
    public List<Car> getCarsByDisponibility(String dateInStr, String dateOutStr) {
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
                isAvailable = car.getId() != id;
            return isAvailable;
        }).toList();
    }
}