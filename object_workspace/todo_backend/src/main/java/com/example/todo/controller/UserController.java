package com.example.todo.controller;

import com.example.todo.dto.ResponseDTO;
import com.example.todo.dto.UserDTO;
import com.example.todo.model.UserEntity;
import com.example.todo.security.TokenProvider;
import com.example.todo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?>registerUser(@RequestBody UserDTO userDTO){
        try{
            UserEntity user = UserEntity.builder()
                    .email(userDTO.getEmail())
                    .username(userDTO.getUsername())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .build();
            UserEntity registeredUser = userService.create(user);
            UserDTO responseUserDTO = userDTO.builder()
                    .email(registeredUser.getEmail())
                    .id(registeredUser.getId())
                    .username(registeredUser.getUsername())
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }catch(Exception e){
            ResponseDTO<Object> responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO){
        UserEntity user = userService.getByCredentials(userDTO.getEmail(), userDTO.getPassword(),passwordEncoder);

        if(user != null){
            final String token = tokenProvider.create(user);
            final UserDTO responseUserDTO = UserDTO.builder()
                                            .email(user.getEmail())
                                            .id(user.getId())
                                            .token(token)
                                            .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }else{
            ResponseDTO<Object> responseDTO = ResponseDTO.builder()
                                .error("Login failed")
                                .build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
