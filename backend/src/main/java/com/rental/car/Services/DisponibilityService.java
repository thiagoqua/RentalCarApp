package com.rental.car.Services;

import com.rental.car.Models.Disponibility;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DisponibilityService {
    void reserve(Disponibility dispo);
    List<Disponibility> getAllByUser(Long userId);
    void delete(Long id);
    ResponseEntity<Void> setPaid(Long adminId, Long dispoId);
    ResponseEntity<List<Disponibility>> getAll(Long adminId);
}
