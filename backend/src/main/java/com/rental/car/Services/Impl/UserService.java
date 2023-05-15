package com.rental.car.Services.Impl;

import com.rental.car.Models.Role;
import com.rental.car.Models.User;
import com.rental.car.Models.UserDTO;
import com.rental.car.Repositories.UserRepository;
import com.rental.car.Utils.UserDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository repo;
    @Autowired
    private UserDTOMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repo.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("USER NOT FOUND"));
    }

    public UserDetails loadById(Long id) throws UsernameNotFoundException{
        return repo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("ID NOT FOUND"));
    }

    public ResponseEntity<List<UserDTO>> getByIds(Long adminId,List<Long> ids){
        List<UserDTO> res;
        if(!checkForAdmin(adminId))
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        res = repo.findAllById(ids).stream()
                .map(user -> mapper.apply(user,null))
                .toList();
        return ResponseEntity.ok(res);
    }

    public Boolean checkForAdmin(Long id) throws UsernameNotFoundException{
        return ((User)loadById(id)).getRole() == Role.ADMIN;
    }
}
