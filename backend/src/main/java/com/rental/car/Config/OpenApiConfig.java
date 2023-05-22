package com.rental.car.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Rental Car API",
                version = "1.0",
                contact = @Contact(
                        name = "Thiago Quaglia",
                        email = "thiagoqua16@gmail.com",
                        url = "http://thiagoqua.ar"
                ),
                description = "An API for my rental car web project"
        ),
        servers = @Server(
                url = "http://localhost:8080",
                description = "local server"
        )
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class OpenApiConfig {

}
