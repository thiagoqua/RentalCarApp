package com.rental.car.Repositories;

import com.rental.car.Models.Car;
import com.rental.car.Models.CarCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,Long> {
    List<Car> findAll();
    List<Car> findByCategory(CarCategory category);
    @Query(value = "SELECT * FROM car WHERE price <= ?1",nativeQuery = true)
    List<Car> findByPriceLessThan(Double price);
}
