package com.rental.car.Controllers;

import com.rental.car.Models.Car;
import com.rental.car.Models.Disponibility;
import com.rental.car.Services.CarService;
import com.rental.car.Services.DisponibilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/disponibility")
@CrossOrigin(origins = "*")
@Tag(name = "Disponibility")
public class DisponibilityController {
    @Autowired
    private CarService carService;
    @Autowired
    private DisponibilityService dispoService;

    @Operation(summary = "Get the cars by its disponibilities")
    @Parameters(value = {
            @Parameter(name = "in",description = "Reservation's date in",
                        example = "2023-05-20",in = ParameterIn.QUERY),
            @Parameter(name = "out",description = "Reservation's date out",
                        example = "2023-05-30",in = ParameterIn.QUERY)
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "The cars available from the dates given"),
            @ApiResponse(responseCode = "403",description = "Bad data in the query")
    })
    @GetMapping("/cars")
    private List<Car> getCarsByDisponibility(@RequestParam @Parameter(hidden = true) Map<String,String> params){
        return carService.getCarsByDisponibility(params.get("in"),params.get("out"));
    }

    @Operation(summary = "Make a reservation")
    @Parameter(name = "toReserve",description = "Disponibility object to make the reserve",
                in = ParameterIn.DEFAULT)
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Reservation done successfully"),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token",
                    content = @Content)
    })
    @PostMapping("/reserve")
    private ResponseEntity<Void> reserveCar(@RequestBody Disponibility toReserve){
        dispoService.reserve(toReserve);
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "Get the user's reservations")
    @Parameter(name = "userid",description = "The id of the user whose reservations are being fetched",
                in = ParameterIn.QUERY)
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "The reservations done by the user"),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token",
                    content = @Content)
    })
    @GetMapping("/all")
    private List<Disponibility> getAllByUser(@RequestParam Long userid){
        return dispoService.getAllByUser(userid);
    }

    @Operation(summary = "Delete a user's reservations")
    @Parameter(name = "id",description = "The reservation's id to be deleted",in = ParameterIn.QUERY)
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Reservation deleted successfully"),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token",
                    content = @Content)
    })
    @DeleteMapping("/delete")
    private ResponseEntity<Void> delete(@RequestParam Long id){
        dispoService.delete(id);
        return ResponseEntity.ok().build();
    }

    @Operation(tags = {"Admin"},summary = "Get all the reservation")
    @Parameter(name = "adminId",description = "The id of the admin user who is soliciting the resource",
                in = ParameterIn.QUERY)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "All the reservations"),
            @ApiResponse(responseCode = "401",description = "Access unauthorized. Restricted to admin users",
                            content = @Content),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token",
                    content = {@Content})
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/admin/all")
    private ResponseEntity<List<Disponibility>> getAll(@RequestParam Long adminId){
        return dispoService.getAll(adminId);
    }

    @Operation(tags = {"Admin"},summary = "Confirm the payment of a reservation")
    @Parameters(value = {
            @Parameter(name = "adminId",description = "The id of the admin user who is soliciting the resource",
                        in = ParameterIn.QUERY),
            @Parameter(name = "id",description = "The reservation's id to set the payment",
                        in = ParameterIn.QUERY)
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "The payment was setted"),
            @ApiResponse(responseCode = "401",description = "Access unauthorized. Restricted to admin users",
                            content = {@Content}),
            @ApiResponse(responseCode = "403",description = "Unauthorized. Invalid or missing JWT token",
                    content = {@Content})
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/admin/paid")
    private ResponseEntity<Void> setPaid(@RequestParam Long adminId,Long id){
        return dispoService.setPaid(adminId,id);
    }
}
