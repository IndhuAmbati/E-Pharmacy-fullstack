package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.User;

@Service
public class UserDao {
	    private final UserRepository userRepo;

	    @Autowired
	    public UserDao(UserRepository userRepo) {
	        this.userRepo = userRepo;
	    }
	    public List<User> getAllUsers() {
	        return userRepo.findAll();
	    }

	    public User getUserById(Integer id) {
	        return userRepo.findById(id).orElse(null);
	    }

	    public User getUserByEmail(String emailId) {
	        return userRepo.getUserByEmailId(emailId).orElse(null);
	    }

	    
	
}
