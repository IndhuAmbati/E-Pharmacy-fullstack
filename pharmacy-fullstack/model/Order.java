package com.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Order {
	
	 
	public Order() {
		 
	}
	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long orderId;

	    @ManyToOne
	    @JoinColumn(name = "userId")
	    private User user;

	    private Date orderDate;
	    private double totalAmount;
	    private String status;
	    
	    public Order(Long orderId, User user, Date orderDate, double totalAmount, String status) {
			super();
			this.orderId = orderId;
			this.user = user;
			this.orderDate = orderDate;
			this.totalAmount = totalAmount;
			this.status = status;
		}

		public Long getOrderId() {
			return orderId;
		}

		public void setOrderId(Long orderId) {
			this.orderId = orderId;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public Date getOrderDate() {
			return orderDate;
		}

		public void setOrderDate(Date orderDate) {
			this.orderDate = orderDate;
		}

		public double getTotalAmount() {
			return totalAmount;
		}

		public void setTotalAmount(double totalAmount) {
			this.totalAmount = totalAmount;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}
	    
	    
}
