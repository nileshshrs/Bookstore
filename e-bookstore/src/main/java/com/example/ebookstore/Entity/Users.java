package com.example.ebookstore.Entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    //Column Name
    private long id;
    private String name;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    // Set a default role for the user
    @Enumerated(EnumType.STRING)
    private Roles roles = Roles.users;

    private String image;
    @Transient
    private String usernameOrEmail;

    // sending data to test in test directory
    public Users(String username, String password) {
        this.username = username;
        this.password = password;
    }

    //Enum representing roles
    public enum Roles{
        admin, users
    }



    //forgot pass
    // Inside Users.java
//private String resetToken;

// Getter and Setter for resetToken


//     Constructor with parameters

    //Getters and Setters


    //getters and setters for reset pass
//    public String getResetToken() {
//        return resetToken;
//    }
//
//    // Setter for resetToken
//    public void setResetToken(String resetToken) {
//        this.resetToken = resetToken;
//    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }
}

