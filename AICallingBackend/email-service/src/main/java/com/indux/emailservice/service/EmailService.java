package com.indux.emailservice.service;

import com.indux.emailservice.model.EmailLog;
import com.indux.emailservice.repository.EmailLogRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    public EmailService(JavaMailSender mailSender, EmailLogRepository emailLogRepository) {
        this.mailSender = mailSender;
        this.emailLogRepository = emailLogRepository;
    }

    public void sendMail(String to, String subject, String body) {

        EmailLog log = new EmailLog();
        log.setToEmail(to);
        log.setSubject(subject);
        log.setStatus("PENDING");
        log.setOpened(false);
        log = emailLogRepository.save(log);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String clickLink = baseUrl + "/api/email/click/" + log.getId()
                    + "?redirect=http://localhost:5173/";

            String trackingPixel = "<img src='" + baseUrl + "/api/email/track/"
                    + log.getId() + "?t=" + System.currentTimeMillis() + "' width='1' height='1' style='opacity:0;' />";

            String finalBody =
                    "<!DOCTYPE html>" +
                            "<html>" +
                            "<body>" +
                            "<div>" + body + "</div>" +
                            "<br/><br/>" +
                            "<a href='" + clickLink + "'>Click here</a>" +
                            trackingPixel +
                            "</body>" +
                            "</html>";

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(finalBody, true);

            mailSender.send(message);

            log.setStatus("SENT");

        } catch (Exception e) {
            log.setStatus("FAILED");
            log.setErrorMessage(e.getMessage());
        }

        emailLogRepository.save(log);
    }
}