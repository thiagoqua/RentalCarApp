package com.rental.car.Services.Impl;

import com.rental.car.Models.Disponibility;
import com.rental.car.Repositories.DisponibilityRepository;
import com.rental.car.Services.DisponibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisponibilityServiceImpl implements DisponibilityService {
    @Autowired
    private DisponibilityRepository repo;
    @Autowired
    private UserService userService;

    @Override
    public void reserve(Disponibility dispo) {
        dispo.setPaid(false);
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

    @Override
    public ResponseEntity<Void> setPaid(Long adminId, Long dispoId) {
        Disponibility dispoInCuestion;

        if(!userService.checkForAdmin(adminId))
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();

        dispoInCuestion = repo.findById(dispoId).get();
        dispoInCuestion.setPaid(true);
        repo.save(dispoInCuestion);

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<Disponibility>> getAll(Long adminId) {
        if(!userService.checkForAdmin(adminId))
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        return ResponseEntity.ok(repo.findAll());
    }
}
