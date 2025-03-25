package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Prescription;

@Service
public class PrescriptionDao {
    private final PrescriptionRepository prescriptionRepo;

    @Autowired
    public PrescriptionDao(PrescriptionRepository prescriptionRepo) {
        this.prescriptionRepo = prescriptionRepo;
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepo.findAll();
    }

    public Prescription getPrescriptionById(Integer id) {
        return prescriptionRepo.findById(id).orElse(null);
    }

    public List<Prescription> getPrescriptionsByUserId(Integer userId) {
        return prescriptionRepo.findByUserId(userId);
    }

}
