package com.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {

    @Query("from Medicine where name = :name")
    Optional<Medicine> getMedicineByName(@Param("name") String name);
    
    @Query("from Medicine where id = :id")
    Optional<Medicine> findById(@Param("id") String id);

}
