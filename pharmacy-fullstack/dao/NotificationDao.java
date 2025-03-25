package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Notification;

@Service
public class NotificationDao {
    private final NotificationRepository notificationRepo;

    @Autowired
    public NotificationDao(NotificationRepository notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepo.findAll();
    }

    public Notification getNotificationById(Integer id) {
        return notificationRepo.findById(id).orElse(null);
    }
}