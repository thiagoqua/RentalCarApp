package com.rental.car.Controllers;

import com.rental.car.Models.UserAuth.AuthenticationRequest;
import com.rental.car.Models.UserAuth.RegisterRequest;
import com.rental.car.Models.UserDTO;
import com.rental.car.Services.AuthenticationService;
import com.rental.car.Services.Impl.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@Tag(name = "User")
public class UserController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private UserService userService;

    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "The user registered information plus the JWT token"),
            @ApiResponse(responseCode = "403",description = "Bad data in the request"),
            @ApiResponse(responseCode = "409",description = "A user with the email given already exists",
                            content = @Content)
    })
    @PostMapping("/register")
    private ResponseEntity<UserDTO> register(@RequestBody @Parameter RegisterRequest request) {
        return authService.register(request);
    }

    @Operation(summary = "Authenticate a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "The user authenticated information plus the JWT token"),
            @ApiResponse(responseCode = "404",description = "User not found with the credentials given",
                    content = @Content)
    })
    @PostMapping("/authenticate")
    private ResponseEntity<UserDTO> login(@RequestBody @Parameter AuthenticationRequest request){
        return authService.authenticate(request);
    }

    @Operation(summary = "Validate the user's JWT")
    @Parameters(value = {
            @Parameter(name = "userid",description = "The id of the user which token is being validating",
                        in = ParameterIn.QUERY),
            @Parameter(name = "token",description = "The token to validate",in = ParameterIn.QUERY)
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Token is valid"),
            @ApiResponse(responseCode = "403",description = "User not found"),
            @ApiResponse(responseCode = "406",description = "Token is not longer valid")
    })
    @GetMapping("/validate")
    private ResponseEntity<Void> checkToken(@RequestParam Long userid,@RequestParam String token){
        return authService.validate(token,userid);
    }

    @Operation(tags = {"Admin"},summary = "Get all the users")
    @Parameter(name = "adminId",description = "The id of the admin user who is soliciting the resource",
            in = ParameterIn.QUERY)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "All the users"),
            @ApiResponse(responseCode = "401",description = "Access unauthorized. Restricted to admin users",
                    content = @Content),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token")
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/admin/idmulti")
    private ResponseEntity<List<UserDTO>> getByIds(@RequestParam Long adminId,
                                                   @RequestBody @Parameter List<Long> ids){
        return userService.getByIds(adminId,ids);
    }
}
