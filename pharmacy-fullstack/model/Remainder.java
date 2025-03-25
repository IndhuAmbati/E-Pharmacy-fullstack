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
	public Remainder(Long reminderId, User user, String medicineName, Date reminderTime, boolean isRepeated) {
		super();
		this.reminderId = reminderId;
		this.user = user;
		this.medicineName = medicineName;
		this.reminderTime = reminderTime;
		this.isRepeated = isRepeated;
	}
	public Remainder() {
		
	}
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private String medicineName;
    private Date reminderTime;
    private boolean isRepeated;
	public Long getReminderId() {
		return reminderId;
	}
	public void setReminderId(Long reminderId) {
		this.reminderId = reminderId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getMedicineName() {
		return medicineName;
	}
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	public Date getReminderTime() {
		return reminderTime;
	}
	public void setReminderTime(Date reminderTime) {
		this.reminderTime = reminderTime;
	}
	public boolean isRepeated() {
		return isRepeated;
	}
	public void setRepeated(boolean isRepeated) {
		this.isRepeated = isRepeated;
	} 
    
    
}
