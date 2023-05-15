package com.rental.car.Controllers;

import com.rental.car.Config.JwtService;
import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.AuthenticationResponse;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Models.UserDTO;
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

    @PostMapping("/register")
    private ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/authenticate")
    private ResponseEntity<UserDTO> login(@RequestBody AuthenticationRequest request){
        return authService.authenticate(request);
    }

    @GetMapping("/validate")
    private ResponseEntity<Boolean> checkToken(@RequestParam Long userid,@RequestParam String token){
        return authService.validate(token,userid);
    }
}
