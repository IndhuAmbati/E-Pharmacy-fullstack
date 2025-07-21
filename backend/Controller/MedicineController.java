package com.Controller;

import com.dao.MedicineDao;
import com.model.Medicine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:8080")
public class MedicineController {

    @Autowired
    private MedicineDao medicineDao;

    // Public: Get all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineDao.findAll();
    }

    // Public: Get medicine by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineDao.findById(id);
        return medicine.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Admin only: Add new medicine
    @PostMapping
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine,
                                         @RequestHeader(value = "X-Admin", required = false) String adminHeader) {
        if (!"true".equals(adminHeader)) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Medicine saved = medicineDao.save(medicine);
        return ResponseEntity.ok(saved);
    }

    // Admin only: Update existing medicine
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicineDetails,
                                            @RequestHeader(value = "X-Admin", required = false) String adminHeader) {
        if (!"true".equals(adminHeader)) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Optional<Medicine> optionalMedicine = medicineDao.findById(id);
        if (optionalMedicine.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Medicine medicine = optionalMedicine.get();
        medicine.setName(medicineDetails.getName());
        medicine.setDescription(medicineDetails.getDescription());
        medicine.setCategory(medicineDetails.getCategory());
        medicine.setPrice(medicineDetails.getPrice());
        medicine.setOriginalPrice(medicineDetails.getOriginalPrice());
        medicine.setDiscountPercent(medicineDetails.getDiscountPercent());
        medicine.setRating(medicineDetails.getRating());
        medicine.setImageUrl(medicineDetails.getImageUrl());
        medicine.setRequiresPrescription(medicineDetails.isRequiresPrescription());
        medicine.setQuantity(medicineDetails.getQuantity());
        medicine.setStore(medicineDetails.getStore());

        Medicine updated = medicineDao.update(medicine);
        return ResponseEntity.ok(updated);
    }

    // Admin only: Delete medicine by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id,
                                            @RequestHeader(value = "X-Admin", required = false) String adminHeader) {
        if (!"true".equals(adminHeader)) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        medicineDao.deleteById(id);
        return ResponseEntity.ok("Medicine deleted successfully.");
    }
}
