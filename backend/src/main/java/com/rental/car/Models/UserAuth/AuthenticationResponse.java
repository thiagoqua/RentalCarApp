package com.rental.car.Models.UserAuth;

import com.rental.car.Models.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data @Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private Long id;
    private String token;
    private String firstname;
    private String lastname;
    private String email;
    private String nationality;
    private String identifier;
    private String borndate;
}
