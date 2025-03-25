package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Medicine;

@Service
public class MedicineDao {
	private final MedicineRepository medicineRepo;

    @Autowired
    public MedicineDao(MedicineRepository medicineRepo) {
        this.medicineRepo = medicineRepo;
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepo.findAll();
    }

    public Medicine getMedicineById(Integer id) {
        return medicineRepo.findById(id).orElse(null);
    }

    public Medicine getMedicineByName(String name) {
        return medicineRepo.getMedicineByName(name).orElse(null);
    }
}
