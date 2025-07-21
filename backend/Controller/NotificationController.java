package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dao.NotificationDao;
import com.dao.UserDao;
import com.model.Notification;
import com.model.User;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationDao notificationDao;

    @Autowired
    private UserDao userDao;

    // 1. Add notification (Admin or System)
    @PostMapping("/add")
    public Notification addNotification(@RequestParam Long adminId, @RequestBody Notification notification) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            notificationDao.save(notification);
            return notification;
        } else {
            throw new RuntimeException("Only admin can add notifications.");
        }
    }

    // 2. Get notifications by user (User)
    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            return notificationDao.findByUserId(userId);
        } else {
            throw new RuntimeException("User not found or not authorized.");
        }
    }

    // 3. Update notification (Admin)
    @PutMapping("/update")
    public Notification updateNotification(@RequestParam Long adminId, @RequestBody Notification notification) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return notificationDao.update(notification);
        } else {
            throw new RuntimeException("Only admin can update notifications.");
        }
    }

    // 4. Delete notification (Admin)
    @DeleteMapping("/delete/{notificationId}")
    public String deleteNotification(@PathVariable Long notificationId, @RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            notificationDao.deleteById(notificationId);
            return "Notification deleted successfully.";
        } else {
            throw new RuntimeException("Only admin can delete notifications.");
        }
    }

    // 5. Get all notifications (Admin)
    @GetMapping("/all")
    public List<Notification> getAllNotifications(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return notificationDao.findAll();
        } else {
            throw new RuntimeException("Only admin can view all notifications.");
        }
    }
}
