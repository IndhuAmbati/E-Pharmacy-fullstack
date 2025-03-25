package com.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {
		public Notification() {
	    	
	}
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long notificationId;

	    @ManyToOne
	    @JoinColumn(name = "userId")
	    private User user;

	    private String message;
	    private boolean isRead;
	    private Date timestamp;
	    public Notification(Long notificationId, User user, String message, boolean isRead, Date timestamp) {
			super();
			this.notificationId = notificationId;
			this.user = user;
			this.message = message;
			this.isRead = isRead;
			this.timestamp = timestamp;
		}
		public Long getNotificationId() {
			return notificationId;
		}
		public void setNotificationId(Long notificationId) {
			this.notificationId = notificationId;
		}
		public User getUser() {
			return user;
		}
		public void setUser(User user) {
			this.user = user;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public boolean isRead() {
			return isRead;
		}
		public void setRead(boolean isRead) {
			this.isRead = isRead;
		}
		public Date getTimestamp() {
			return timestamp;
		}
		public void setTimestamp(Date timestamp) {
			this.timestamp = timestamp;
		}
	    
}
