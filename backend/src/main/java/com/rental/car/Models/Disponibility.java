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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp datein;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp dateout;
}
