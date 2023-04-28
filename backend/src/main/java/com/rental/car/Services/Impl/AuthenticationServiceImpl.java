package com.rental.car.Services.Impl;

import com.rental.car.Config.JwtService;
import com.rental.car.Models.Role;
import com.rental.car.Models.User;
import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.AuthenticationResponse;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Repositories.UserRepository;
import com.rental.car.Services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserRepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        String token;
        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repo.save(user);
        token = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(token).build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user;
        String token;
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()
                )
        );
        user = repo.findByEmail(request.getEmail()).orElseThrow();
        token = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(token).build();
    }
}
