package com.rental.car.Services;

import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.AuthenticationResponse;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Models.UserDTO;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    ResponseEntity<UserDTO> register(RegisterRequest request);
    ResponseEntity<UserDTO> authenticate(AuthenticationRequest request);
    ResponseEntity<Boolean> validate(String token,Long userId);
}
