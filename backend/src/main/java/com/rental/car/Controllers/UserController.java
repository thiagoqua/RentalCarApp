package com.rental.car.Controllers;

import com.rental.car.User.RegistrationRequest;
import com.rental.car.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/registration")
    private String register(@RequestBody RegistrationRequest request){
        return service.register(request);
    }
}
