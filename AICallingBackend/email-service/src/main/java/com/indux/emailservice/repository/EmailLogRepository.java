package com.indux.emailservice.repository;

import com.indux.emailservice.model.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
}