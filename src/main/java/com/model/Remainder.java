package com.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Remainder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;

    private Date remainderTime;  

    private String message; 
    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Remainder() {}

    public Remainder(String medicineName, Date remainderTime, String message, User user) {
        this.medicineName = medicineName;
        this.remainderTime = remainderTime;
        this.message = message;
        this.user = user;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public Date getRemainderTime() {
        return remainderTime;
    }

    public void setRemainderTime(Date remainderTime) {
        this.remainderTime = remainderTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

