package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer>{
	List<Prescription> findByUserId(Integer userId);
}
