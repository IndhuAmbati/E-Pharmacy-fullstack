package com.dao;

import com.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	    List<Notification> findByUser_Id(Long userId);
	
	List<Notification> findByUser_IdAndIsReadFalse(Long userId);

}