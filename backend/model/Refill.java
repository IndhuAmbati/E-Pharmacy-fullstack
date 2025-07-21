package com.model;

import java.util.Date;

import jakarta.persistence.*;

@Entity
public class Refill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refillId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String medicineName;

    private int tabletsLeft;

    @Temporal(TemporalType.DATE)
    private Date expectedFinishDate;
    
    public Refill(Long refillId, User user, String medicineName, int tabletsLeft, Date expectedFinishDate) {
		super();
		this.refillId = refillId;
		this.user = user;
		this.medicineName = medicineName;
		this.tabletsLeft = tabletsLeft;
		this.expectedFinishDate = expectedFinishDate;
	}

	public Refill() {
	}

	public Long getRefillId() {
		return refillId;
	}

	public void setRefillId(Long refillId) {
		this.refillId = refillId;
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

	public int getTabletsLeft() {
		return tabletsLeft;
	}

	public void setTabletsLeft(int tabletsLeft) {
		this.tabletsLeft = tabletsLeft;
	}

	public Date getExpectedFinishDate() {
		return expectedFinishDate;
	}

	public void setExpectedFinishDate(Date expectedFinishDate) {
		this.expectedFinishDate = expectedFinishDate;
	}

	

}
