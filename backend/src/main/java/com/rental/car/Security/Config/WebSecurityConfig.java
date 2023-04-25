//package com.rental.car.Security.Config;
//
//import com.rental.car.User.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@EnableWebSecurity
//public class WebSecurityConfig {
//    @Autowired
//    private UserService service;
//    @Autowired
//    private BCryptPasswordEncoder encoder;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//        http
//                .authorizeHttpRequests()
//                .anyRequest()
//                .authenticated()
//                        .and()
//                .httpBasic();
//        return http.build();
//    }
//}
