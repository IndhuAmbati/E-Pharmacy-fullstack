package com.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByCategoryIgnoreCase(String category);
    List<Medicine> findByExpiryDate(LocalDate date);

    List<Medicine> findByNameContainingIgnoreCase(String name);
}
