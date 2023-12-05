package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository= userRepository;
    }

    public Users createUser(Users users)    {
        // Check if the username is already taken
        if (userRepository.existsByUsernameOrEmail(users.getUsername(), users.getEmail())) {
            throw new IllegalArgumentException("Username or email is already taken");
        }
        return userRepository.save(users);
    }

    public Users loginUser(String usernameOrEmail, String password) {
        System.out.println("Attempting login with usernameOrEmail: " + usernameOrEmail);

        Optional<Users> optionalUser = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();

            // Simple password check (without encryption)
            if (password.equals(user.getPassword())) {
                System.out.println("Login successful for user: " + user.getUsername());
                return user;
            }
        }

        // Either user not found or password doesn't match
        System.out.println("Invalid username or password");
        throw new IllegalArgumentException("Invalid username or password");
    }

    public Optional<Users> getUsersById(long id){
        return userRepository.findById(id);
    }
}
