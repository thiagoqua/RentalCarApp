package com.rental.car.Services;

import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.AuthenticationResponse;
import com.rental.car.Models.UserAuth.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
