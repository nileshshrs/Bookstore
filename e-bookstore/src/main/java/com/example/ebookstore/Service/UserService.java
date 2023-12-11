package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // register service
    public Users createUser(Users users) {
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

    public Optional<Users> getUsersById(long id) {
        return userRepository.findById(id);
    }

    public Users putUser(Long userId, Users updatedUser) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if 'username' or 'email' is provided in the updatedUser, and throw an exception if they are
        if (updatedUser.getUsername() != null || updatedUser.getEmail() != null) {
            throw new IllegalArgumentException("Username or email cannot be updated");
        }

        // Copy the fields from updatedUser to existingUser
        existingUser.setName(updatedUser.getName());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setRoles(updatedUser.getRoles());
        existingUser.setImage(updatedUser.getImage());

        return userRepository.save(existingUser);
    }
    //get all users
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }


    // patch users
    public Users patchUser(Long userId, Map<String, Object> updates) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String field = entry.getKey();
            Object value = entry.getValue();

            // Exclude username and email from being updated
            if ("username".equals(field) || "email".equals(field)) {
                throw new IllegalArgumentException(field + " cannot be updated");
            }

            // Set the field value using reflection
            try {
                Field userField = Users.class.getDeclaredField(field);
                userField.setAccessible(true);
                userField.set(user, value);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new IllegalArgumentException("Invalid field for update: " + field);
            }
        }

        return userRepository.save(user);
    }

    // delete users
    public void deleteUser(Long userId) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(existingUser);
    }

}

