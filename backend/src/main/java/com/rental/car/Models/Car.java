package com.rental.car.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private CarCategory category;
    private String brand;
    private String model;
    @Column(name = "image")
    private String imageURL;
    @Column(name = "born")
    private int year;
    @Column(name = "price")
    private Double pricePerDay;
    private short doors;                //4 or 2
    private String transmission;        //automatic or manual
    @Column(name = "fueltype")
    private String fuelType;            //gasoline, diesel, hybrid or electric
    private boolean AC;
    @Column(name = "urban")
    private short urbanConsumption;     //kilometers per litre
    @Column(name = "route")
    private short routeConsumption;     //kilometers per litre
}