package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Remainder;


@Service
public class RemainderDao {
		private final RemainderRepository remainderRepo;

	    @Autowired
	    public RemainderDao(RemainderRepository remainderRepo) {
	        this.remainderRepo = remainderRepo;
	    }

	    public List<Remainder> getAllRemainders() {
	        return remainderRepo.findAll();
	    }

	    public List<Remainder> getRemaindersByUserId(Integer userId) {
	        return remainderRepo.findByUserId(userId);
	    }
}
