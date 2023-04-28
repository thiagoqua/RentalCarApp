package com.rental.car;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class RentalCarAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentalCarAppApplication.class, args);
	}

}
