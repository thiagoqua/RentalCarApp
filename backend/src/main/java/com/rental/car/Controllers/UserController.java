package com.rental.car.Controllers;

import com.rental.car.Config.JwtService;
import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.AuthenticationResponse;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private JwtService tokenService;

    @PostMapping("/register")
    private ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    private ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/validate")
    private ResponseEntity<Boolean> checkToken(@RequestParam Long userid,@RequestParam String token){
        return ResponseEntity.ok(tokenService.isTokenValid(token,userid));
    }
}
