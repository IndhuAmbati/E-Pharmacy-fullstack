package com.dao;

import com.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // Custom method to find all addresses for a specific user by userId
    List<Address> findByUserId(Long userId);
}