package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v2/users")
@CrossOrigin(origins = "http://localhost:5173")// change the url value for it to work on your server
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

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserById(@PathVariable Long userId) {
        try {
            Users user = userService.getUsersById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // api for getting all users

    @GetMapping("get-all-users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    //patch users api
    @PatchMapping("/edit/{userId}")
    public ResponseEntity<Object> patchUser(@PathVariable Long userId, @RequestBody Map<String, Object> updates) {
        try {
            // Check if updates contain 'username' or 'email', and throw an exception if they do
            if (updates.containsKey("username") || updates.containsKey("email")) {
                throw new IllegalArgumentException("Username or email cannot be updated");
            }

            Users updatedUser = userService.patchUser(userId, updates);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // If the patching fails, return a JSON response with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
    //delete users api
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // If the deletion fails, return a JSON response with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

}