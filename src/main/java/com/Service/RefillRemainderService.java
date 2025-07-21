package com.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.dao.MedicineRepository;
import com.dao.UserDao;
import com.model.Medicine;
import com.model.User;

@Component
public class RefillRemainderService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailService emailService;

    // Run daily at 9 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendExpiryReminders() {
        LocalDate today = LocalDate.now();
        List<Medicine> medicines = medicineRepository.findAll();

        for (Medicine med : medicines) {
            LocalDate expiry = med.getExpiryDate();
            if (expiry == null) continue;

            long daysRemaining = ChronoUnit.DAYS.between(today, expiry);

            if (daysRemaining == 1) {
                List<User> users = userDao.findAll();
                for (User user : users) {
                    String subject = "⏰ Medicine Expiry Reminder";
                    String body = "Dear " + user.getName() + ",\n\nYour medicine \"" + med.getName() +
                            "\" is expiring tomorrow (" + expiry + "). Please take action accordingly.\n\nRegards,\nE-Pharmacy";
                    emailService.sendSimpleEmail(user.getEmail(), subject, body);
                }
            }
        }
    }
}
