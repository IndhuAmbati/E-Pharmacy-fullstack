package com.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Service.EmailService;
import com.dao.PrescriptionRepository;
import com.dao.UserDao;
import com.model.Prescription;
import com.model.PrescriptionStatus;
import com.model.User;

@RestController
@RequestMapping("/api/prescription")
@CrossOrigin(origins = "http://localhost:8080")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailService emailService;

    // ✅ Upload prescription by user
    @PostMapping("/user/addPrescription/{userId}")
    public ResponseEntity<String> uploadPrescription(@PathVariable Long userId, @RequestBody Prescription prescription) {
        Optional<User> optionalUser = userDao.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();
        prescription.setUser(user);
        prescription.setUploadDate(new Date());
        prescription.setStatus(PrescriptionStatus.PENDING);
        prescriptionRepository.save(prescription);

        emailService.sendSimpleEmail(
            "admin@example.com",
            "New Prescription Uploaded",
            "User " + user.getName() + " uploaded a prescription. Please review it."
        );

        return ResponseEntity.ok("Prescription uploaded successfully.");
    }

    // ✅ Admin: Get all prescriptions
    @GetMapping("/admin/getAllPrescriptions")
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadDate"));
        return ResponseEntity.ok(prescriptions);
    }

    // ✅ Admin: Update prescription status
    @PutMapping("/admin/updateStatus/{id}")
    public ResponseEntity<?> updatePrescriptionStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        System.out.println(">>> Update prescription status called for ID: " + id);
        System.out.println(">>> Incoming payload: " + request);

        Optional<Prescription> optionalPrescription = prescriptionRepository.findById(id);
        if (optionalPrescription.isEmpty()) {
            return ResponseEntity.badRequest().body("Prescription not found");
        }

        if (!request.containsKey("status") || request.get("status") == null) {
            return ResponseEntity.badRequest().body("Missing status field");
        }

        String newStatus = request.get("status").toUpperCase();

        try {
            PrescriptionStatus statusEnum = PrescriptionStatus.valueOf(newStatus);
            Prescription prescription = optionalPrescription.get();
            prescription.setStatus(statusEnum);
            prescriptionRepository.save(prescription);

            User user = prescription.getUser();
            if (user != null && user.getEmail() != null) {
                emailService.sendSimpleEmail(
                    user.getEmail(),
                    "Prescription Status Updated",
                    "Hi " + user.getName() + ", your prescription has been " + newStatus.toLowerCase() + "."
                );
            }

            return ResponseEntity.ok(prescription);
        } catch (IllegalArgumentException e) {
            System.err.println(">>> Invalid status enum: " + newStatus);
            return ResponseEntity.badRequest().body("Invalid status value. Use PENDING, APPROVED, or REJECTED.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Unexpected server error: " + e.getMessage());
        }
    }

    // ✅ Get latest prescription for user
    @GetMapping("/user/getLatestPrescription/{userId}")
    public ResponseEntity<?> getLatestPrescription(@PathVariable Long userId) {
        List<Prescription> prescriptions = prescriptionRepository.findByUserIdOrderByUploadDateDesc(userId);
        if (prescriptions.isEmpty()) {
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok(prescriptions.get(0));
    }
}
