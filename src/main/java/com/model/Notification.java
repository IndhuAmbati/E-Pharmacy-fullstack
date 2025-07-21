package com.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private boolean isRead; 
    @ManyToOne
    private User user;


    public Notification(Long id, String message, Date createdAt, boolean isRead) {
		super();
		this.id = id;
		this.message = message;
		this.createdAt = createdAt;
		this.isRead = isRead;
	}

	public Notification() {
		super();
		// TODO Auto-generated constructor stub
	}

	// Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

    public Date getCreatedAt() { return createdAt; }

    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public boolean isRead() { return isRead; }

    public void setRead(boolean read) { isRead = read; }
}
