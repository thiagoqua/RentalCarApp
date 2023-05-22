package com.rental.car.Utils;

import com.rental.car.Models.Disponibility;
import com.rental.car.Services.DisponibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public class ReservationCleanup{
    @Autowired
    DisponibilityService service;

    @Scheduled(cron = "0 1 12 * * *")
    public void cleanUnretrievedReserves() {
        Timestamp today = new Timestamp(System.currentTimeMillis());
        List<Disponibility> dispos = service.getAll();
        dispos.forEach(disponibility -> {
            if(!disponibility.getPaid() &&
                disponibility.getDateIn().compareTo(today) < 0){
                service.delete(disponibility.getId());
            }
        });
    }
}
