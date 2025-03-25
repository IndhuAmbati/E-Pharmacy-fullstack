package com.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Prescription {
	 

	public Prescription() {
		 
	}

	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long prescriptionId;

	    @ManyToOne
	    @JoinColumn(name = "userId")
	    private User user;

	    private String prescriptionUrl;
	    public Prescription(Long prescriptionId, User user, String prescriptionUrl) {
			super();
			this.prescriptionId = prescriptionId;
			this.user = user;
			this.prescriptionUrl = prescriptionUrl;
		}
		public Long getPrescriptionId() {
			return prescriptionId;
		}
		public void setPrescriptionId(Long prescriptionId) {
			this.prescriptionId = prescriptionId;
		}
		public User getUser() {
			return user;
		}
		public void setUser(User user) {
			this.user = user;
		}
		public String getPrescriptionUrl() {
			return prescriptionUrl;
		}
		public void setPrescriptionUrl(String prescriptionUrl) {
			this.prescriptionUrl = prescriptionUrl;
		}
	    
	    
}
