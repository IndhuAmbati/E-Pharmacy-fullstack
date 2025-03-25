package com.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("from User where emailId = :emailId")
    Optional<User> getUserByEmailId(@Param("emailId") String emailId);

    @Query("from User where id = :id")
    Optional<User> getUserById(@Param("id") Integer id); // Fixed incorrect @Param("Id")
}