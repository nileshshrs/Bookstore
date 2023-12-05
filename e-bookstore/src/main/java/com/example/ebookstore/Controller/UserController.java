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

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Users loginUser) {
        try {
            // Log the received values
            System.out.println("Received username: " + loginUser.getUsernameOrEmail());
            System.out.println("Received password: " + loginUser.getPassword());

            // Use the loginUser method from the UserService with both username and email
            Users user = userService.loginUser(loginUser.getUsernameOrEmail(), loginUser.getPassword());

            // Create a response map with user information appearing first
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("message", "Login successful");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // Create an error response map
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Login failed: " + e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }
}
