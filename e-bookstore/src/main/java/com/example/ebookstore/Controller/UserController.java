package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v2/users")
@CrossOrigin(origins = "http://localhost:3000")// change the url value for it to work on your server
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService)  {
        this.userService= userService ;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> createUsers(@RequestBody Users users) {
        try{
            Users savedUsers = userService.createUser(users);
            String successMessage = "Registration successful";

            // Construct the response as a Map
            Map<String, Object> response = new HashMap<>();

            response.put("message", successMessage);
            response.put("users", savedUsers);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        }catch (Exception e)  {
            String errorMessage = "Registration failed: " + e.getMessage();
            // Construct the error response as a Map
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);

            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }
}
