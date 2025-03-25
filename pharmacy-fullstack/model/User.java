package com.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	public User() {
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String contactNumber;
    private String state;
    private Date dateOfBirth;

public User(int id, String name, String email, String password, String address, String contactNumber, String state,
		Date dateOfBirth) {
	super();
	this.id = id;
	this.name = name;
	this.email = email;
	this.password = password;
	this.address = address;
	this.contactNumber = contactNumber;
	this.state = state;
	this.dateOfBirth = dateOfBirth;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
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

public String getAddress() {
	return address;
}

public void setAddress(String address) {
	this.address = address;
}

public String getContactNumber() {
	return contactNumber;
}

public void setContactNumber(String contactNumber) {
	this.contactNumber = contactNumber;
}

public String getState() {
	return state;
}

public void setState(String state) {
	this.state = state;
}

public Date getDateOfBirth() {
	return dateOfBirth;
}

public void setDateOfBirth(Date dateOfBirth) {
	this.dateOfBirth = dateOfBirth;
}
}
