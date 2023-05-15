package com.rental.car.Services.Impl;

import com.rental.car.Config.JwtService;
import com.rental.car.Models.Role;
import com.rental.car.Models.User;
import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Models.UserDTO;
import com.rental.car.Repositories.UserRepository;
import com.rental.car.Services.AuthenticationService;
import com.rental.car.Utils.UserDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private UserDTOMapper mapper;

    @Override
    public ResponseEntity<UserDTO> register(RegisterRequest request) {
        if(repo.findByEmail(request.getEmail()).isPresent())
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();

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

        return ResponseEntity.ok(mapper.apply(user,token));
    }

    @Override
    public ResponseEntity<UserDTO> authenticate(AuthenticationRequest request) {
        Optional<User> userCheck;
        User user;
        String token;
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()
                )
        );
        userCheck = repo.findByEmail(request.getEmail());

        if(userCheck.isEmpty())
            return ResponseEntity.notFound().build();

        user = userCheck.get();
        token = jwtService.generateToken(user);
        return ResponseEntity.ok(mapper.apply(user,token));
    }

    @Override
    public ResponseEntity<Boolean> validate(String token, Long userId) {
        return jwtService.isTokenValid(token,userId)
                ? ResponseEntity.ok(true)
                : ResponseEntity.ok(false);
    }
}
