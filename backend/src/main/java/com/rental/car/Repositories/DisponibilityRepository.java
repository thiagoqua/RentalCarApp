package com.rental.car.Repositories;

import com.rental.car.Models.Disponibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface DisponibilityRepository extends JpaRepository<Disponibility,Long> {
    final String findNotAvailableCarsQuery = "SELECT car FROM disponibility WHERE " +
            "((datein >= ?1 AND datein <=?2) OR (dateout >= ?1 AND dateout <= ?2)) OR " +
            "(datein <= ?1 AND dateout >= ?2);";

    @Query(value = findNotAvailableCarsQuery,nativeQuery = true)
    List<Long> findNotAvailableCars(Timestamp dateIn,Timestamp dateOut);
    List<Disponibility> findByUserId(Long userId);
}

