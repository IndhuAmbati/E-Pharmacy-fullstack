package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dao.FeedBackDao;
import com.dao.UserDao;
import com.model.FeedBack;
import com.model.User;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackDao feedbackDao;

    @Autowired
    private UserDao userDao;
    

    // 1. User submits feedback
    @PostMapping("/add")
    public FeedBack addFeedback(@RequestParam Long userId, @RequestBody FeedBack feedback) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            feedback.setUser(user);
            feedbackDao.save(feedback);
            return feedback;
        } else {
            throw new RuntimeException("Only users can submit feedback.");
        }
    }

    // 2. User views their own feedback
    @GetMapping("/user/{userId}")
    public List<FeedBack> getUserFeedback(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            return feedbackDao.findByUserId(userId);
        } else {
            throw new RuntimeException("Not authorized to view feedback.");
        }
    }


    // 3. Admin views all feedback
    @GetMapping("/all")
    public List<FeedBack> getAllFeedback(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return feedbackDao.findAll();
        } else {
            throw new RuntimeException("Only admin can view all feedback.");
        }
    }

    // 4. Admin deletes feedback
    @DeleteMapping("/delete/{feedbackId}")
    public String deleteFeedback(@PathVariable Long feedbackId, @RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            feedbackDao.deleteById(feedbackId);
            return "Feedback deleted successfully.";
        } else {
            throw new RuntimeException("Only admin can delete feedback.");
        }
    }
}
