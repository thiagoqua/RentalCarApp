package com.rental.car.Services;

import com.rental.car.Models.Disponibility;

import java.util.List;

public interface DisponibilityService {
    void reserve(Disponibility dispo);
    List<Disponibility> getAllByUser(Long userId);
}
