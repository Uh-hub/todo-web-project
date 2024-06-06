package com.example.todo.dto;

public class PasswordConfirmationDTO {
    private Long userId;
    private String password;

    // Default constructor
    public PasswordConfirmationDTO() {
    }

    // Parameterized constructor
    public PasswordConfirmationDTO(Long userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}