package com.dao;

import com.model.Remainder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RemainderRepository extends JpaRepository<Remainder, Long> {

    List<Remainder> findByUserId(Long userId);
    List<Remainder> findByMedicine_Id(Long medicineId);

}
