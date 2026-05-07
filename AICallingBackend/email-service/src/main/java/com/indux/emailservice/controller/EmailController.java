package com.indux.emailservice.controller;

import com.indux.emailservice.model.EmailLog;
import com.indux.emailservice.repository.EmailLogRepository;
import com.indux.emailservice.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;
    private final EmailLogRepository emailLogRepository;

    public EmailController(EmailService emailService, EmailLogRepository emailLogRepository) {
        this.emailService = emailService;
        this.emailLogRepository = emailLogRepository;
    }

    @PostMapping("/send")
    public String sendEmail(@RequestBody Map<String, String> request) {

        String to = request.get("to");
        String subject = request.get("subject");
        String body = request.get("body");

        emailService.sendMail(to, subject, body);

        return "Email sent successfully";
    }

    @GetMapping("/track/{id}")
    public void trackEmail(@PathVariable Long id) {
        EmailLog log = emailLogRepository.findById(id).orElseThrow();
        log.setOpened(true);
        emailLogRepository.save(log);
    }

    @GetMapping("/click/{id}")
    public void trackClick(@PathVariable Long id,
                           @RequestParam String redirect,
                           jakarta.servlet.http.HttpServletResponse response) throws java.io.IOException {

        EmailLog log = emailLogRepository.findById(id).orElseThrow();
        log.setOpened(true);
        emailLogRepository.save(log);

        response.sendRedirect(redirect);
    }

    @GetMapping("/failed")
    public List<EmailLog> getFailedEmails() {
        return emailLogRepository.findAll()
                .stream()
                .filter(log -> "FAILED".equals(log.getStatus()))
                .toList();
    }

    @GetMapping("/logs")
    public List<EmailLog> getAllLogs() {
        return emailLogRepository.findAll();
    }

    @GetMapping("/opened")
    public List<EmailLog> getOpenedEmails() {
        return emailLogRepository.findAll()
                .stream()
                .filter(EmailLog::isOpened)
                .toList();
    }

    @GetMapping("/not-opened")
    public List<EmailLog> getNotOpenedEmails() {
        return emailLogRepository.findAll()
                .stream()
                .filter(log -> !log.isOpened())
                .toList();
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        List<EmailLog> logs = emailLogRepository.findAll();

        long total = logs.size();
        long opened = logs.stream().filter(EmailLog::isOpened).count();
        long failed = logs.stream().filter(l -> "FAILED".equals(l.getStatus())).count();

        return Map.of(
                "total", total,
                "opened", opened,
                "notOpened", total - opened,
                "failed", failed
        );
    }
}