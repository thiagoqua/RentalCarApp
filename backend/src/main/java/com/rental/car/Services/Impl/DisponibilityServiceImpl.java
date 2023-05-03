package com.rental.car.Services.Impl;

import com.rental.car.Models.Disponibility;
import com.rental.car.Repositories.DisponibilityRepository;
import com.rental.car.Services.DisponibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisponibilityServiceImpl implements DisponibilityService {
    @Autowired
    private DisponibilityRepository repo;

    @Override
    public void reserve(Disponibility dispo) {
        repo.save(dispo);
    }

    @Override
    public List<Disponibility> getAllByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
