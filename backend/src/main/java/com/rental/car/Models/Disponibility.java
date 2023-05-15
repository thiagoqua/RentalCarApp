package com.rental.car.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Disponibility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "car")
    private Long carId;
    @Column(name = "user")
    private Long userId;
    @Column(name = "datein")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp dateIn;
    @Column(name = "dateout")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp dateOut;
    private Boolean paid;
}
