package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Remainder;

@Repository
public interface RemainderRepository extends JpaRepository<Remainder, Integer> {
    List<Remainder> findByUserId(Integer userId); 
}
