package com.rental.car.Utils;

import com.rental.car.Models.User;
import com.rental.car.Models.UserDTO;
import org.springframework.stereotype.Service;

import java.util.function.BiFunction;

@Service
public class UserDTOMapper implements BiFunction<User, String, UserDTO> {
    @Override
    public UserDTO apply(User user,String token) {
        return new UserDTO(
                user.getId(),
                token,
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getNationality(),
                user.getIdentifier(),
                user.getBorndate().toString(),
                user.getRole().name()
        );
    }
}
