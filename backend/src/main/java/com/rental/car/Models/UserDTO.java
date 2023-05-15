package com.rental.car.Models;

public record UserDTO(
        Long id,
        String token,
        String firstname,
        String lastname,
        String email,
        String nationality,
        String identifier,
        String borndate,
        String role
) {}
