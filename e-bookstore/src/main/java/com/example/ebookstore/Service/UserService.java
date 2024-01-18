package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

//forgot pass
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//yeta samma
import org.springframework.stereotype.Service;


//forgot pass
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;

import java.lang.reflect.Field;

//forgot pass
//import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


//forgotpass
//import java.util.UUID;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//
//
//
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;

//yeta


@Service
public class UserService {
   


    private final UserRepository userRepository;

    //forgot pass
//

    @Autowired
    // JavaMailSender javaMailSender 
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    //forgot
//        this.javaMailSender = javaMailSender;
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

            // Use the correct field names from your Users entity
            switch (field) {
                case "name":
                    user.setName((String) value);
                    break;

                case "image":
                    user.setImage((String) value);
                    break;
                // Add other fields as needed
                case "roles":
                    user.setRoles(Users.Roles.valueOf((String) value));
                    break;

                default:
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


    //forgot pass
//    public void generateResetToken(String email) {
//        Users user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        // Generate a unique reset token (you can use UUID.randomUUID().toString())
//        String resetToken = generateUniqueResetToken();
//
//        user.setResetToken(resetToken);
//        userRepository.save(user);
//
//        // Send the reset token to the user's email (you need to implement this part)
//        sendResetTokenByEmail(user.getEmail(), resetToken);
//    }
//    private String generateUniqueResetToken() {
        // Generate a random token using SecureRandom
//        SecureRandom secureRandom = new SecureRandom();
//        byte[] bytes = new byte[20];
//        secureRandom.nextBytes(bytes);
//
//        // Encode the random bytes using Base64
//       // String resetToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
//
//        //return resetToken;
//   // }
    
//   private void sendResetTokenByEmail(String email, String resetToken) {
//        Users user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo(user.getEmail());
//        mailMessage.setSubject("Password Reset");
//        mailMessage.setText("To reset your password, click on the following link: "
//                + "localhost:5173/verify-otp/reset-password?token=" + resetToken);
//
//        javaMailSender.send(mailMessage);
//    }
//
//
//    // In UserService.java
//public void resetPassword(String resetToken, String newPassword) {
//    Users user = userRepository.findByResetToken(resetToken)
//            .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token"));
//
//    // Set the new password and clear the reset token
//    user.setPassword(newPassword);
//    user.setResetToken(null);
//    userRepository.save(user);
//}
public List<Users> getAllUsersss() {
    return userRepository.findAll();
}

    public Users findUserByEmailAndUsername(String email, String username) {
        return userRepository.findByUsernameOrEmail(username, email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Users updateUserPassword(Long userId, String newPassword) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(newPassword);
        return userRepository.save(user);
    }



}

