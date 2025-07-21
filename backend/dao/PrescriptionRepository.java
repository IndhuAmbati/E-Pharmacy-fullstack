package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Payment;
import com.model.Prescription;
import com.model.PrescriptionStatus;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
	List<Prescription> findByUserId(Long userId);
	List<Payment> findByStatus(PrescriptionStatus status); 

    List<Prescription> findByUserIdOrderByUploadDateDesc(Long userId);
}
