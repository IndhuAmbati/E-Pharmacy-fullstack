package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Refill;
import com.model.User;

@Repository
public interface RefillRepository extends JpaRepository<Refill, Long> {
    List<Refill> findByUser(User user);
}
