package com.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.PasswordResetTokenDao;
import com.dao.UserDao;
import com.model.PasswordResetToken;
import com.model.User;

@Service
public class forgotpasswordservice {

    @Autowired
    private PasswordResetTokenDao tokenDao;

    @Autowired
    private UserDao userDao;

    private static final int EXPIRATION = 60 * 24;  // expiration time in minutes

    public String createPasswordResetTokenForUser(String email) {
        Optional<User> optionalUser = userDao.findByEmail(email);

        // Extract User or throw exception if not found
        User user = optionalUser.orElseThrow(() -> 
            new RuntimeException("No user found with email: " + email)
        );

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(calculateExpiryDate(EXPIRATION));
        tokenDao.save(resetToken);

        // TODO: Send email with this token in a reset link
        return token;
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTimeInMillis());
    }

    // Optional: method to validate token and reset password...
}
