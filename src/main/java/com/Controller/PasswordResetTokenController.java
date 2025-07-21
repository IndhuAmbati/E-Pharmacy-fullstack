package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Service.forgotpasswordservice;

@CrossOrigin(origins = "http://localhost:8080")  // Allow React frontend on port 3000
@RestController
@RequestMapping("/api/auth")
public class PasswordResetTokenController {

    @Autowired
    private forgotpasswordservice forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        try {
            String token = forgotPasswordService.createPasswordResetTokenForUser(email);
            return ResponseEntity.ok(token);  // You can customize response here
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
