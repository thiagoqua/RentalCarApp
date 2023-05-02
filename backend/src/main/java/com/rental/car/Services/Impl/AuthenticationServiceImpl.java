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

import java.sql.Timestamp;
import java.util.Optional;

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
        if(repo.findByEmail(request.getEmail()).isPresent())
            return AuthenticationResponse.builder()
                    .id(null)
                    .token(null)
                    .build();
        String token;
        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nationality(request.getNationality())
                .identifier(request.getIdentifier())
                .borndate(Timestamp.valueOf(request.getBorndate() + " 09:00:00"))
                .role(Role.USER)
                .build();

        repo.save(user);
        token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .id(user.getId())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> userCheck;
        User user;
        String token;
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()
                )
        );
        userCheck = repo.findByEmail(request.getEmail());

        if(userCheck.isEmpty()){
            System.out.println("dont exists");
            return AuthenticationResponse.builder().id((long) -1).build();
        }

        user = userCheck.get();
        token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .token(token)
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .nationality(user.getNationality())
                .identifier(user.getIdentifier())
                .borndate(user.getBorndate().toString())
                .build();
    }
}
